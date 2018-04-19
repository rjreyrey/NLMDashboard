import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectApplication, addApplication } from '../actions/'


class ApplicationList extends Component {
   
    createlistItems() {
        return this.props.applications.map((app) => {
            return (
                <div className="sidebarSectionListItem" key={app.id} >
                    <div className="sidebarSectionListItemLabel">{app.name}</div>
                    <div className="sidebarSectionListItemIFrame" data-url={app.url} onClick={() => this.props.selectApplication(app)} className={app.active && app.opened ? 'sidebarSectionListItemIFrame active opened' : app.active ? 'sidebarSectionListItemIFrame active' : app.opened ? 'sidebarSectionListItemIFrame opened' : 'sidebarSectionListItemIFrame'}><i className="fas fa-expand"></i></div>
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                {this.createlistItems()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        applications: state.applications
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        selectApplication: selectApplication,
        addApplication: addApplication
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ApplicationList);