/*
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright Contributors to the Zowe Project.
 */


// Note: This doesn't gaurantee command did what it was supposed to do, but rather z/OS Unix (and zwe) didn't throw an error
export const JCL_UNIX_SCRIPT_OK = "Script finished.";

export const TYPE_YAML = "yaml";
export const TYPE_JCL = "jcl";
export const TYPE_OUTPUT = "output";

export const DEV_NO_OUTPUT = "No output to display."
export const DEF_JOB_STATEMENT = `//ZWEJOB01 JOB IZUACCT,'SYSPROG',CLASS=A,\n//         MSGLEVEL=(1,1),MSGCLASS=A`;