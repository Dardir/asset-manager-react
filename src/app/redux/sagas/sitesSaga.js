import { takeLatest, call, put } from 'redux-saga/effects';
import {SGRD_RETRIEVE_SITE_TREE, setTreeData, RetrieveSiteTreeFailed}   from '../modules/siteTree';
import {getSiteTreeApi} from '../api/siteTreeApi';


function *getSiteTree() {
  try{
    const siteTreeResponse = yield call(getSiteTreeApi);
    yield put(setTreeData(siteTreeResponse));
  }catch(error) {
    yield put(RetrieveSiteTreeFailed(error));
  }
}


export function *watchRetrieveSiteTree(context) {
  yield takeLatest(SGRD_RETRIEVE_SITE_TREE, getSiteTree);
}
