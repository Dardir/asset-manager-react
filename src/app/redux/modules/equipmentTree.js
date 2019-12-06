export const SET_TREE_DATA = 'SET_TREE_DATA';
export const SELECT_TREE_NODE = 'SELECT_TREE_NODE';
export const CHANGE_NODE_INFO = 'CHANGE_NODE_INFO';
export const SGRD_RETRIEVE_EQUIPMENT_TREE = 'SGRD_RETRIEVE_EQUIPMENT_TREE';
export const RETRIEVE_EQUIPMENT_TREE_FAILED = 'RETRIEVE_EQUIPMENT_TREE_FAILED';


export default function equipmentTree(state = {isFetchingEquipmentTree:false, retrieveError:null, selectedNode: {node: {title: '',eqTypeKey: '',equipmentTypeInfo: { properties: [], general: { isConsumable: false, threshold: '', applicableForMaintenance: false, unit:'' }, maintenance: { period: 1, units: '', duration: 1, durationUnit: '', isDeactivated: false, sendNotificationIfThreshold: false } }}}  }, action) {
  switch (action.type) {
  case SET_TREE_DATA:
    return {
      ...state,isFetchingEquipmentTree:false, retrieveError:null, treeData: action.treeData.treeData
    };
  case SELECT_TREE_NODE:
    return {
      ...state, selectedNode: action.node
    };
  case CHANGE_NODE_INFO:
  {
    let currentTree = SearchAndUpdateTreesNode(state.treeData, action.nodeId, action.nodeName, action.nodeInfo);
    return {
      ...state, treeData: currentTree
    };
  }
  case SGRD_RETRIEVE_EQUIPMENT_TREE:
    return {
      ...state, isFetchingEquipmentTree:true, retrieveError:null
    };
  case RETRIEVE_EQUIPMENT_TREE_FAILED:
    return{
      ...state, isFetchingEquipmentTree:false, retrieveError:action.error
    };
  default: return state;
  }
}


export function setTreeData(treeData) {
  return {
    type: SET_TREE_DATA,
    treeData
  };
}

export function RetrieveEquipmentTree() {
  return {
    type: SGRD_RETRIEVE_EQUIPMENT_TREE
  };
}

export function RetrieveEquipmentTreeFailed(error) {
  return {
    type: RETRIEVE_EQUIPMENT_TREE_FAILED,
    error
  };
}

export function selectTreeNode(node) {
  return {
    type: SELECT_TREE_NODE,
    node
  };
}

export function changeNodeInfo(nodeName, nodeInfo, nodeId) {
  return {
    type: CHANGE_NODE_INFO,
    nodeName, nodeInfo, nodeId
  };
}

function SearchAndUpdateTreesNode(trees, nodeId, nodeName, nodeInfo) {
  return trees.map((tree)=>{return SearchAndUpdateTreeNode(tree,nodeId, nodeName, nodeInfo)});
}

function SearchAndUpdateTreeNode(tree, nodeId, nodeName, nodeInfo) {
  if(tree.eqTypeKey === nodeId) {
    // update node
    tree.title = nodeName;
    tree.equipmentTypeInfo = nodeInfo;  
  } 
  
  if ('children' in tree) {
    let childTree = SearchAndUpdateTreesNode(tree.children, nodeId, nodeName, nodeInfo);
    tree.children = childTree;
    return tree;
  } else{
    return tree;
  }
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
