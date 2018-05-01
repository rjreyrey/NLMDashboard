import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectApplication, addApplication, addTab, addWebview } from '../actions/'


class ApplicationList extends Component {
   
    createlistItems() {
        return this.props.applications.map((app) => {
            return (
                <div className="sidebarSectionListApplicationWrapper" key={app.id}>
                    <div className="sidebarSectionListApplicationLabel">{app.name}</div>
                    {app.services.map((service) => {
                        return (
                            <div className="sidebarSectionListItem" key={service.id} >
                                <div className="sidebarSectionListItemLabel">{service.name}</div>
                                <div className="sidebarSectionListItemIFrame" data-url={service.url} onClick={() => Promise.resolve(this.props.selectApplication(service)).then(this.props.addTab(service)).then(this.props.addWebview(service))} className={service.active && service.opened ? 'sidebarSectionListItemIFrame active opened' : service.active ? 'sidebarSectionListItemIFrame active' : service.opened ? 'sidebarSectionListItemIFrame opened' : 'sidebarSectionListItemIFrame'}><i className="fas fa-expand"></i></div>
                            </div>
                        );
                    })}
                </div >    
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
        addTab: addTab,
        addWebview: addWebview
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ApplicationList);