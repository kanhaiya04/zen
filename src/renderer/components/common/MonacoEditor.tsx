/*
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright Contributors to the Zowe Project.
 */

import React, { useEffect, useRef, useState } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { load } from 'js-yaml';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const MonacoEditorComponent = ({contentType, initialContent, onContentChange, isSchemaValid, schemaError} : any) => {

  const editorRef = useRef(null);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  let readOnly = true;
  let lang: string;

  useEffect(() => {
    if(contentType == 'yaml') {
      monaco.languages.register({ id: 'yaml' });
      readOnly = false;
      lang = 'yaml';
    } else if(contentType == 'output') {
      lang = 'plaintext';
    } else if(contentType == 'jcl') {
      lang = 'jcl';
    }

    editorRef.current = monaco.editor.create(document.getElementById('monaco-editor-container'), {
      language: lang, 
      theme: 'light',
      value: initialContent,
      readOnly: readOnly
    });

    editorRef.current.onDidChangeModelContent(() => {
      const code = editorRef.current.getValue();

      if(contentType == 'yaml') {
        try {
          // To parse the yaml and check if it is valid
          const parsedYAML = load(code);
          setError(false, '');
          onContentChange(code, false);
        } catch(error) {
          let errorDesc = error.message ? error.message : "Invalid Yaml";
          let errorMsg = error.reason ? error.reason : errorDesc;
          setError(true, errorMsg);
          onContentChange(code, true);
        }
      }
    });

    return () => {
      editorRef.current.dispose();
    };

  }, []);

  useEffect(() => {
    editorRef.current.setValue(initialContent);
  }, [initialContent])


  const setError = (isError: boolean, errorMessage: string) => {
    setIsError(isError);
    setErrorMsg(errorMessage);
  }

  return (
    <div style={{ height: '400px' }}>
      {isError && (
        <div id="error-msg" 
          style={{ color: 'red', fontFamily: 'Arial, sans-serif', fontSize: 'small', paddingBottom: '1px' }}>
          <FontAwesomeIcon icon={faExclamationTriangle} style={{ marginRight: '5px' }} />  
          {errorMsg}
        </div>)}
      {!isSchemaValid && (
        <div id="error-msg" 
          style={{ color: 'red', fontFamily: 'Arial, sans-serif', fontSize: 'small' , paddingBottom: '5px' }}>
          <FontAwesomeIcon icon={faExclamationTriangle} style={{ marginRight: '5px' }} />
          {schemaError}
        </div>)}
      <div id="monaco-editor-container" style={{ width: '100%', height: '100%', margin: '0' }}></div>
    </div> 
  );
};

export default MonacoEditorComponent;