/*
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright Contributors to the Zowe Project.
 */

import { flatten, unflatten } from 'flat';
import { ProgressState, PlanningState, InstallationType, ActiveState, DatasetInstallationState, InitSubStepsState, CertInitSubStepsState, PlanningValidationDetails, SkipState, InstallationArgs, DownloadUnpaxState} from '../../../../types/stateInterfaces';
import { stages } from '../../configuration-wizard/Wizard';

const installationTypeStatus: InstallationType = {
  installationType: 'download',
  licenseAgreement: false,
  userUploadedPaxPath: '',
}

export const downloadUnpaxStatus: DownloadUnpaxState = {
  uploadYaml: false,
  download: false,
  upload: false,
  unpax: false,
  getExampleYaml: false,
  getSchemas: false,
}

const progressStatus: ProgressState = {
  connectionStatus: false,
  planningStatus: false,
  installationTypeStatus: false,
  downloadUnpaxStatus: false,
  initializationStatus: false,
  datasetInstallationStatus: false,
  networkingStatus: false,
  apfAuthStatus: false,
  securityStatus: false,
  stcsStatus: false,
  certificateStatus: false,
  vsamStatus: false,
  launchConfigStatus: false,
  reviewStatus: false,
}

const activeStatus: ActiveState = {
  activeStepIndex: 0,
  isSubStep: false,
  activeSubStepIndex: 0,
};

const planningStageStatus: PlanningState = {
  jobStatement: '',
  isJobStatementValid: false,
  isLocationValid: false,
}

export const datasetInstallationStatus: DatasetInstallationState = {
  uploadYaml: false,
  install: false,
  initMVS: false
}

const apfAuthStatus: InitSubStepsState = {
  writeYaml: false,
  uploadYaml: false,
  success: false
}

const securityInitStatus: InitSubStepsState = {
  writeYaml: false,
  uploadYaml: false,
  success: false
}

const stcsInitStatus: InitSubStepsState = {
  writeYaml: false,
  uploadYaml: false,
  success: false
}

const certificateInitStatus: CertInitSubStepsState = {
  writeYaml: false,
  uploadYaml: false,
  zweInitCertificate: false
}

const vsamInitStatus: InitSubStepsState = {
  writeYaml: false,
  uploadYaml: false,
  success: false
}

const planningValidationDetailsStatus: PlanningValidationDetails = {
  javaVersion: '',
  nodeVersion: '',
  spaceAvailableMb: '',
  error: ''
}

const stepSkipStatus: SkipState = {
  downloadUnpax: false,
  datasetInstallation: false,
  networking: false,
  apfAuth: false,
  security: false,
  certificate: false,
  vsam: false,
  launchConfig: false
}

const installationArgsStatus: InstallationArgs = {
  installationDir: '',
    workspaceDir: '',
    logDir:'',
    extensionDir:'',
    installationType: 'download',
    userUploadedPaxPath: '',
    downloadDir: '',
    javaHome: '',
    nodeHome: '',
    setupConfig: {},
    jobName: 'ZWE1SV',
    jobPrefix: 'ZWE1',
    rbacProfile: '1',
    cookieId: '1',
    zosmfHost: '',
    zosmfPort: '443',
    zosmfApplId: 'IZUDFLT'
}

let progressStateKey = 'stage_progress';
let activeStateKey = 'active_state';
let planningStateKey = 'planning_stage';
let installationTypeKey = 'installation_type';
let downloadUnpaxKey = 'download_unpax';
let datasetInstallationKey = 'dataset_installation';
let apfAuthKey = 'apf_auth';
let securityKey = 'security_init';
let stcsKey = 'stcs_init';
let certificateKey = 'certificate_init';
let vsamKey = 'vsam_init';
let planningValidationDetailsKey = `planning_validation_details`;
let prevInstallationKey = `prev_installation`;
let skipStateKey = `skip_state`;
let installationArgsKey = `intallation_args`;

let skipKeysArray: (keyof SkipState)[] = Object.keys(stepSkipStatus) as (keyof SkipState)[];

const setKeys = (id: string) => {
  progressStateKey = `${progressStateKey}_${id}`;
  activeStateKey = `${activeStateKey}_${id}`;
  planningStateKey = `${planningStateKey}_${id}`;
  installationTypeKey = `${installationTypeKey}_${id}`;
  downloadUnpaxKey = `${downloadUnpaxKey}_${id}`;
  datasetInstallationKey = `${datasetInstallationKey}_${id}`;
  apfAuthKey = `${apfAuthKey}_${id}`;
  securityKey = `${securityKey}_${id}`;
  stcsKey = `${stcsKey}_${id}`;
  certificateKey = `${certificateKey}_${id}`;
  vsamKey = `${vsamKey}_${id}`;
  planningValidationDetailsKey = `${planningValidationDetailsKey}_${id}`;
  skipStateKey = `${skipStateKey}_${id}`;
  installationArgsKey = `${installationArgsKey}_${id}`;
}

export const initializeProgress = (host: string, user: string) => {
  const id = `${host}_${user}`;
  setKeys(id);

  const progress = localStorage.getItem(progressStateKey);
  if(!progress) {
    const flattenedData = flatten(progressStatus);
    localStorage.setItem(progressStateKey, JSON.stringify(flattenedData));
  }

  const activeStage = localStorage.getItem(activeStateKey);
  if(!activeStage) {
    const flattenedData = flatten(activeStatus);
    localStorage.setItem(activeStateKey, JSON.stringify(flattenedData));
  }

  const planningState = localStorage.getItem(planningStateKey);
  if(!planningState) {
    const flattenedData = flatten(planningStageStatus);
    localStorage.setItem(planningStateKey, JSON.stringify(flattenedData));
  }

  const installationTypeState = localStorage.getItem(installationTypeKey);
  if(!installationTypeState) {
    const flattenedData = flatten(installationTypeStatus);
    localStorage.setItem(installationTypeKey, JSON.stringify(flattenedData));
  }

  const downloadUnpaxState = localStorage.getItem(downloadUnpaxKey);
  if(!downloadUnpaxState) {
    const flattenedData = flatten(downloadUnpaxStatus);
    localStorage.setItem(downloadUnpaxKey, JSON.stringify(flattenedData));
  }

  const datasetInstallationState = localStorage.getItem(datasetInstallationKey);
  if(!datasetInstallationState) {
    const flattenedData = flatten(datasetInstallationStatus);
    localStorage.setItem(datasetInstallationKey, JSON.stringify(flattenedData));
  }

  const apfAuthState = localStorage.getItem(apfAuthKey);
  if(!apfAuthState) {
    const flattenedData = flatten(apfAuthStatus);
    localStorage.setItem(apfAuthKey, JSON.stringify(flattenedData));
  }

  const securityInitState = localStorage.getItem(securityKey);
  if(!securityInitState) {
    const flattenedData = flatten(securityInitStatus);
    localStorage.setItem(securityKey, JSON.stringify(flattenedData));
  }

  const stcsInitState = localStorage.getItem(stcsKey);
  if(!stcsInitState) {
    const flattenedData = flatten(stcsInitStatus);
    localStorage.setItem(stcsKey, JSON.stringify(flattenedData));
  }

  const certificateInitState = localStorage.getItem(certificateKey);
  if(!certificateInitState) {
    const flattenedData = flatten(certificateInitStatus);
    localStorage.setItem(certificateKey, JSON.stringify(flattenedData));
  }

  const vsamInitState = localStorage.getItem(vsamKey);
  if(!vsamInitState) {
    const flattenedData = flatten(vsamInitStatus);
    localStorage.setItem(vsamKey, JSON.stringify(flattenedData));
  }

  const planningValidationDetailsState = localStorage.getItem(certificateKey);
  if(!planningValidationDetailsState) {
    const flattenedData = flatten(planningValidationDetailsStatus);
    localStorage.setItem(planningValidationDetailsKey, JSON.stringify(flattenedData));
  }

  const stepSkipStatusState = localStorage.getItem(skipStateKey);
  if(!stepSkipStatusState) {
    const flattenedData = flatten(stepSkipStatus);
    localStorage.setItem(skipStateKey, JSON.stringify(flattenedData));
  }

  const installationArgsState = localStorage.getItem(installationArgsKey);
  if(!installationArgsState) {
    const flattenedData = flatten(installationArgsStatus);
    localStorage.setItem(installationArgsKey, JSON.stringify(flattenedData));
  }
}

export const mapAndSetSkipStatus = (subStageId: number, value: boolean): void => {
  setSubStageSkipStatus(skipKeysArray[subStageId], value);
}

export const mapAndGetSkipStatus = (subStageId: number): boolean => {
  const skipStatus = getSubStageSkipStatus();
  const skipStatusArray = [
    skipStatus.downloadUnpax,
    skipStatus.datasetInstallation,
    skipStatus.networking,
    skipStatus.apfAuth,
    skipStatus.security,
    skipStatus.certificate,
    skipStatus.vsam,
    skipStatus.launchConfig
  ]

  return skipStatusArray[subStageId];
}

export const setSubStageSkipStatus = (key: keyof SkipState, newValue: boolean): void => {
  const skipStatus = localStorage.getItem(skipStateKey);
  if (skipStatus) {
    const flattenedData = JSON.parse(skipStatus);
    const unFlattenedData = unflatten(flattenedData) as SkipState;
    Object.assign(stepSkipStatus, unFlattenedData);
  }
  stepSkipStatus[key] = newValue;
  const flattenedData = flatten(stepSkipStatus);
  localStorage.setItem(skipStateKey, JSON.stringify(flattenedData));
}

export const getSubStageSkipStatus = () : SkipState => {
  const skipStatus = localStorage.getItem(skipStateKey);
  if(skipStatus) {
    const flattenedData =  JSON.parse(skipStatus);
    return unflatten(flattenedData);
  } else {
    return stepSkipStatus;
  }
}

export const setPlanningValidationDetailsState = (planningValidationsDetails: PlanningValidationDetails): void => {
  Object.assign(planningValidationDetailsStatus, planningValidationsDetails);
  localStorage.setItem(planningValidationDetailsKey, JSON.stringify(planningValidationDetailsStatus));
}

export const getPlanningValidationDetailsState = (): PlanningValidationDetails => {
  const planningValidationDetailsState = localStorage.getItem(planningValidationDetailsKey);
  if(planningValidationDetailsState) {
    const flattenedData = JSON.parse(planningValidationDetailsState);
    return unflatten(flattenedData)
  } else {
    return planningValidationDetailsStatus;
  }
}

export const setApfAuthState = (apfAuthSteps: InitSubStepsState): void => {
  Object.assign(apfAuthStatus, apfAuthSteps);
  localStorage.setItem(apfAuthKey, JSON.stringify(apfAuthStatus));
}

export const getApfAuthState = (): InitSubStepsState => {
  const apfAuthState = localStorage.getItem(apfAuthKey);
  if(apfAuthState) {
    const flattenedData = JSON.parse(apfAuthState);
    return unflatten(flattenedData);
  } else {
    return apfAuthStatus;
  }
};

export const setSecurityInitState = (securityInitSteps: InitSubStepsState): void => {
  Object.assign(securityInitStatus, securityInitSteps);
  localStorage.setItem(securityKey, JSON.stringify(securityInitStatus));
}

export const getSecurityInitState = (): InitSubStepsState => {
  const securityInitState = localStorage.getItem(securityKey);
  if(securityInitState) {
    const flattenedData = JSON.parse(securityInitState);
    return unflatten(flattenedData)
  } else {
    return securityInitStatus;
  }
}

export const setStcsInitState = (stcsInitSteps: InitSubStepsState): void => {
  Object.assign(stcsInitStatus, stcsInitSteps);
  localStorage.setItem(stcsKey, JSON.stringify(stcsInitStatus));
}

export const getStcsInitState = (): InitSubStepsState => {
  const stcsInitState = localStorage.getItem(stcsKey);
  if(stcsInitState) {
    const flattenedData = JSON.parse(stcsInitState);
    return unflatten(flattenedData)
  } else {
    return stcsInitStatus;
  }
}

export const setCertificateInitState = (certificateInitSteps: CertInitSubStepsState): void => {
  Object.assign(certificateInitStatus, certificateInitSteps);
  localStorage.setItem(certificateKey, JSON.stringify(certificateInitStatus));
}

export const getCertificateInitState = (): CertInitSubStepsState => {
  const certificateInitState = localStorage.getItem(certificateKey);
  if(certificateInitState) {
    const flattenedData = JSON.parse(certificateInitState);
    return unflatten(flattenedData)
  } else {
    return certificateInitStatus;
  }
}

export const setVsamInitState = (vsamInitSteps: InitSubStepsState): void => {
  Object.assign(vsamInitStatus, vsamInitSteps);
  localStorage.setItem(vsamKey, JSON.stringify(vsamInitStatus));
}

export const getVsamInitState = (): InitSubStepsState => {
  const vsamInitState = localStorage.getItem(vsamKey);
  if(vsamInitState) {
    const flattenedData = JSON.parse(vsamInitState);
    return unflatten(flattenedData)
  } else {
    return vsamInitStatus;
  }
}

export const setDatasetInstallationState = (dsInstallSteps: DatasetInstallationState): void => {
  Object.assign(datasetInstallationStatus, dsInstallSteps);
  localStorage.setItem(datasetInstallationKey, JSON.stringify(datasetInstallationStatus));
}

export const getDatasetInstallationState = (): DatasetInstallationState => {
  const datasetInstallationState = localStorage.getItem(datasetInstallationKey);
  if(datasetInstallationState) {
    const flattenedData = JSON.parse(datasetInstallationState);
    return unflatten(flattenedData)
  } else {
    return datasetInstallationStatus;
  }
}

export const setInstallationTypeStatus = <K extends keyof InstallationType>(key: K, newValue: InstallationType[K]): void => {
  const installationData = localStorage.getItem(installationTypeKey);
  if (installationData) {
    const flattenedData = JSON.parse(installationData);
    const unFlattenedData = unflatten(flattenedData) as InstallationType;
    Object.assign(installationTypeStatus, unFlattenedData);
  }
  installationTypeStatus[key] = newValue;
  const flattenedData = flatten(installationTypeStatus);
  localStorage.setItem(installationTypeKey, JSON.stringify(flattenedData));
}

export const getInstallationTypeStatus = (): InstallationType => {
  const installationTypeState = localStorage.getItem(installationTypeKey);
  if(installationTypeStatus) {
    const flattenedData = JSON.parse(installationTypeState);
    return unflatten(flattenedData)
  } else {
    return installationTypeStatus;
  }
}

export const setDownloadUnpaxState = (downloadUnpaxSteps: DownloadUnpaxState): void => {
  Object.assign(downloadUnpaxStatus, downloadUnpaxSteps);
  localStorage.setItem(downloadUnpaxKey, JSON.stringify(downloadUnpaxStatus));
}

export const getDownloadUnpaxState = (): DownloadUnpaxState => {
  const downloadUnpaxState = localStorage.getItem(downloadUnpaxKey);
  if(downloadUnpaxState) {
    const flattenedData = JSON.parse(downloadUnpaxState);
    return unflatten(flattenedData);
  } else {
    return downloadUnpaxStatus;
  }
};

export const setPlanningStageStatus = <K extends keyof PlanningState>(key: K, newValue: PlanningState[K]): void => {
  const planningData = localStorage.getItem(planningStateKey);
  if (planningData) {
    const flattenedData = JSON.parse(planningData);
    const unFlattenedData = unflatten(flattenedData) as PlanningState;
    Object.assign(planningStageStatus, unFlattenedData);
  }
  planningStageStatus[key] = newValue;
  const flattenedData = flatten(planningStageStatus);
  localStorage.setItem(planningStateKey, JSON.stringify(flattenedData));
}

export const getPlanningStageStatus = (): PlanningState => {
  const planningStatus = localStorage.getItem(planningStateKey);
  if(planningStatus) {
    const flattenedData = JSON.parse(planningStatus);
    return unflatten(flattenedData);
  } else {
    return planningStageStatus;
  }
}

export const setInstallationArguments = (newInstallationArgs: InstallationArgs): void => {
  Object.assign(installationArgsStatus, newInstallationArgs);
  const flattenedData = flatten(installationArgsStatus);
  localStorage.setItem(installationArgsKey, JSON.stringify(flattenedData));
}

export const getInstallationArguments = () : InstallationArgs => {
  const installArgs = localStorage.getItem(installationArgsKey);
  if(installArgs) {
    const flattenedData =  JSON.parse(installArgs);
    return unflatten(flattenedData);
  } else {
    return installationArgsStatus;
  }
}

export const setProgress = (key: keyof ProgressState, newValue: boolean): void => {
  const progress = localStorage.getItem(progressStateKey);
  if (progress) {
    const flattenedData = JSON.parse(progress);
    const unFlattenedData = unflatten(flattenedData) as ProgressState;
    Object.assign(progressStatus, unFlattenedData);
  }
  progressStatus[key] = newValue;
  const flattenedData = flatten(progressStatus);
  localStorage.setItem(progressStateKey, JSON.stringify(flattenedData));
}

export const getProgress = (key: keyof ProgressState): boolean => {
  const progress = localStorage.getItem(progressStateKey);
  if(progress) {
    const flattenedData = JSON.parse(progress);
    const unFlattenedData = unflatten(flattenedData) as ProgressState;
    return unFlattenedData[key];
  } else {
    return progressStatus[key];
  }
}

export const getCompleteProgress = () : ProgressState => {
  const progress = localStorage.getItem(progressStateKey);
  if(progress) {
    const flattenedData =  JSON.parse(progress);
    return unflatten(flattenedData);
  } else {
    return progressStatus;
  }
}

export const setActiveStage = (stageId: number, isSubStage: boolean, date: string, subStageId?: number): void => {
  activeStatus.activeStepIndex = stageId;
  activeStatus.isSubStep = isSubStage;
  activeStatus.lastActiveDate = date;

  if(!isSubStage) {
    activeStatus.activeSubStepIndex = 0;
  } else {
    activeStatus.activeSubStepIndex = subStageId;
  }
  
  const flattenedData = flatten(activeStatus);
  localStorage.setItem(activeStateKey, JSON.stringify(flattenedData));
  localStorage.setItem(prevInstallationKey, JSON.stringify(flattenedData));
}

export const getActiveStage = () : ActiveState => {
  const activeStage = localStorage.getItem(activeStateKey);
  if(activeStage) {
    const flattenedData = JSON.parse(activeStage);
    return unflatten(flattenedData);
  } else {
    return activeStatus;
  }
}

export const getPreviousInstallation = () : ActiveState => {
  const activeStage = localStorage.getItem(prevInstallationKey);
  if(activeStage) {
    const flattenedData = JSON.parse(activeStage);
    return unflatten(flattenedData);
  } else {
    return activeStatus;
  }
}


