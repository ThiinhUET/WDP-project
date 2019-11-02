import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400,
    textAlign: 'left',
  },
  project: {
    backgroundColor: 'rgb(70,70,70)',
  }
});

export default function ExplorerView() {
  const classes = useStyles();

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <TreeItem nodeId="1" label="Project">
        <TreeItem nodeId="2" label="index.html" />
        <TreeItem nodeId="3" label="Material-UI">
          <TreeItem nodeId="4" label="src">
            <TreeItem nodeId="5" label="index.js" />
            <TreeItem nodeId="6" label="tree-view.js" />
          </TreeItem>
        </TreeItem>
      </TreeItem>
    </TreeView>
  );
}
