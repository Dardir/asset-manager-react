import { connect }            from 'react-redux';
import SiteTree          from './SiteTree';
import { bindActionCreators } from 'redux';
import { selectTreeNode , setTreeData, RetrieveSiteTree }   from '../../redux/modules/siteTree';

const mapStateToProps = (state) => {
  const props = {
    siteTree: state.siteTree
  };
  return props;
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators(
      {
        setTreeData: setTreeData,
        selectTreeNode: selectTreeNode,
        RetrieveSiteTree: RetrieveSiteTree
      },
      dispatch)
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiteTree);
