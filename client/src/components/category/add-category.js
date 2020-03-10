import React, { Component } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Tooltip,
  Avatar,
  withStyles
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { connect } from "react-redux";
import { CategoryService } from "../../services/category-service";
import { CategoryAction } from "../../actions/category-action";
import { handleCommonError } from "../../utils/request";

class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: null
    };
  }

  toogleDialog = () => {
    this.setState(pre => ({ open: !pre.open }));
  };

  onNameChange = name => {
    this.setState({ name: name });
  };

  addCategory = () => {
    CategoryService.add({
        name: this.state.name
    }).then(res => {
      let cat = res.data;
      this.props.addCategory(cat)
      this.toogleDialog();
    }).catch(err => {
        handleCommonError(err)
        alert("Something went wrong!")
    });
    
  };

  render() {
    let { classes } = this.props;

    return (
      <div>
        <Tooltip title="Add new category" arrow>
          <Avatar className={classes.rounded} onClick={this.toogleDialog}>
            +
          </Avatar>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.toogleDialog}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add new Category</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Category name"
              type="text"
              fullWidth
              state={this.state.name}
              onChange={e => {
                this.onNameChange(e.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.toogleDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={this.addCategory} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const styles = theme => ({
  rounded: {
    color: "#fff",
    backgroundColor: green[500],
    cursor: "pointer"
  }
});

const mapStateToProps = state => ({
  categories: state.categories
});

const mapDispatchToProps = dispatch => ({
  addCategory: cat => {
    dispatch(CategoryAction.addCategory(cat));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddCategory));
