import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectApplication, addApplication, addTab, addWebview } from '../actions/'


class ApplicationList extends Component {
   
    createlistItems() {
        return this.props.applications.map((app) => {
            if (app.name == 'Services') {
                return (
                    <div className="sidebarSectionListApplicationWrapper" key={app.id}>
                        <div className="sidebarSectionListApplicationLabel">{app.name}</div>
                        {app.services.map((service) => {
                            if (service.externals.length > 0 && service.externals.filter((e) => { return e.username.length > 0 && e.password.length > 0 }).length > 0) {
                                return (
                                    <div key={service.id}>
                                        <div className="sidebarSectionListApplicationLabel" style={{margin: '5px 10px 10px 0px'}}>{service.name}</div>
                                        {service.externals.map((external) => {
                                            if (external.username.length > 0 && external.password.length > 0) {
                                                return (
                                                    <div className="sidebarSectionListItem" key={external.id} >
                                                        <div className="sidebarSectionListItemLabel">{external.name}</div>
                                                        <div className="sidebarSectionListItemIFrame" data-url={external.url} onClick={() => Promise.resolve(this.props.selectApplication(external)).then(this.props.addTab(external)).then(this.props.addWebview(external))} className={external.active && external.opened ? 'sidebarSectionListItemIFrame active opened' : external.active ? 'sidebarSectionListItemIFrame active' : external.opened ? 'sidebarSectionListItemIFrame opened' : 'sidebarSectionListItemIFrame'}><i className="fas fa-expand"></i></div>
                                                    </div>
                                                )
                                            }
                                        })}
                                    </div>
                                )
                            }
                        })}
                    </div>
                )
            } else {
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
            }
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