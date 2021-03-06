define(function (require, exports, module) {
    require('common');
    var $ = require('jquery');
    var Backbone = require('backbone');

    var CommonAppView = require('module.common.app-view');
    var BreadcrumbView = require('module.common.app-breadcrumb-view');
    var ContentHeaderView = require('module.common.app-content-header-view');

    var LibraryMusicModule = require('module.library.music');
    var LibraryMusicModel = LibraryMusicModule.LibraryMusicModel;
    var LibraryMusicCollection = LibraryMusicModel.LibraryMusicCollection;
    var LibraryMusicItemView = LibraryMusicModule.LibraryMusicItemView;
    var LibraryMusicListView = LibraryMusicModule.LibraryMusicListView;
    var LibraryMusicItemAddView = LibraryMusicModule.LibraryMusicItemAddView;
    var LibraryMusicItemEditView = LibraryMusicModule.LibraryMusicItemEditView;

    var AppView = CommonAppView.extend({
        default_interface: function () {
            this.set_breadcrumb(new BreadcrumbView({
                title: '音乐素材',
                subtitle: '管理本地素材库中的音乐',
                breadcrumbs: [
                    { title: '素材管理', url: '#' },
                    { title: '音乐素材', url: '#' }
                ]
            }));
            this.set_header(new ContentHeaderView({
                html: require('text!templates/library/music/app_content_header_list.html')
            }));
            this.set_content(new LibraryMusicListView);
        },
        add_interface: function () {
            this.set_breadcrumb(new BreadcrumbView({
                title: '添加音乐素材',
                subtitle: '在本地素材库中添加新的音乐素材',
                breadcrumbs: [
                    { title: '素材管理', url: '#' },
                    { title: '音乐素材', url: '#' },
                    { title: '添加音乐素材', url: '#' }
                ]
            }));
            this.set_header(new ContentHeaderView({
                html: require('text!templates/library/music/app_content_header_add.html')
            }));
            this.set_content(new LibraryMusicItemAddView);
        },
        edit_interface: function (id) {
            this.set_breadcrumb(new BreadcrumbView({
                title: '编辑音乐素材',
                subtitle: '编辑该音乐素材的详细信息',
                breadcrumbs: [
                    { title: '素材管理', url: '#' },
                    { title: '音乐素材', url: '#' },
                    { title: '编辑音乐素材', url: '#/edit/' + id }
                ]
            }));
            this.set_header(new ContentHeaderView({
                html: require('text!templates/library/music/app_content_header_edit.html')
            }));
            this.set_content(new LibraryMusicItemEditView({
                id: id
            }));
        }
    });
    var app_view = new AppView;

    var AppRouter = Backbone.Router.extend({
        routes: {
            'add': 'add',
            'edit/:id': 'edit',
            'detail/:id': 'detail',
            '*actions': 'default_router'
        },
        add: function () {
            app_view.add_interface();
        },
        edit: function (id) {
            app_view.edit_interface(id);
        },
        default_router: function (actions) {
            app_view.default_interface();
        }
    });
    var app_router = new AppRouter;
    Backbone.history.start();
});
