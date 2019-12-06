const SET_SITE_TREE_DATA = 'SET_SITE_TREE_DATA';
const SELECT_SITE_TREE_NODE = 'SELECT_SITE_TREE_NODE';
export const SGRD_RETRIEVE_SITE_TREE = 'SGRD_RETRIEVE_SITE_TREE';
const RETRIEVE_SITE_TREE_FAILED = 'RETRIEVE_SITE_TREE_FAILED';


export default function siteTree(state = {isFetchingSiteTree:false, retrieveError:null, selectedSiteNode:{title: '', locKey:guid(), expanded: true, children:[]}}, action) {
  switch (action.type) {
  case SET_SITE_TREE_DATA:
    return {
      ...state, treeData: action.treeData.treeData, isFetchingSiteTree:false, retrieveError:null
    };
  case SELECT_SITE_TREE_NODE:
    return {
      ...state, selectedSiteNode: action.node, isFetchingSiteTree:false, retrieveError:null
    };

  case SGRD_RETRIEVE_SITE_TREE:
    return {
      ...state, isFetchingSiteTree:true, retrieveError:null
    };
  case RETRIEVE_SITE_TREE_FAILED:
    return{
      ...state, isFetchingSiteTree:false, retrieveError:action.error
    };
  default: return state;
  }
}


export function setTreeData(treeData) {
  return {
    type: SET_SITE_TREE_DATA,
    treeData
  };
}

export function selectTreeNode(node) {
  return {
    type: SELECT_SITE_TREE_NODE,
    node
  };
}

export function RetrieveSiteTree() {
  return {
    type: SGRD_RETRIEVE_SITE_TREE
  };
}

export function RetrieveSiteTreeFailed(error) {
  return {
    type: RETRIEVE_SITE_TREE_FAILED,
    error
  };
}

function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
}
  
function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}
