'use strict';

 /* @ngInject */
var app = angular.module('resolve.next-state', [
        'ui.router',
        'permission',
        'permission.ui'
    ]);

app.provider('nextState', function() {
    this.excludedStates = [];
    this.redirectEvents = [];
    this.defaultHomeRedirect = '';
    this.memos = {};

    this.setExcludedStates = function(excluded) {
        this.excludedStates = excluded;
    };

    this.setRedirectEvents = function(events) {
        this.redirectEvents = events;
    };

    this.setDefaultHomeRedirect = function(redirect) {
        this.defaultHomeRedirect = redirect;
    };

    this.excludedStates = function() {
        return excludedStates;
    };

    this.redirectEvents = function() {
        return redirectEvents;
    };

    this.defaultHomeRedirect = function() {
        return defaultHomeRedirect;
    };

    this.memo = function(name, state) {
        this.memos[name] = state;
    },
    this.forget = function(name) {
        delete this.memos[name];
    },
    this.get = function(memo) {
        return this.memos[memo];
    },
    this.clear = function() {
        this.memos.length = 0;
    };

    var _this = this;
    this.$get = function() {
        return {
            excludedStates: function() {
                return _this.excludedStates;
            },
            redirectEvents: function() {
                return _this.redirectEvents;
            },
            defaultHomeRedirect: function() {
                return _this.defaultHomeRedirect;
            },
            memo: function(memo, state) {
                return _this.memo(memo, state);
            },
            forget: function(name) {
                return _this.forget(name);
            },
            get: function(memo) {
                return _this.get(memo);
            },
            clear: function() {
                return _this.clear;
            }
        };
    };
});

 /* @ngInject */
app.run(function($rootScope, $state, nextState) {
    // NOTE: ui-router state change
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if (!_.contains(nextState.excludedStates(), toState.name)) {
            nextState.memo('redirect', toState);
        }
    });

    // NOTE: angular-permission state change
    $rootScope.$on('$stateChangePermissionStart', function(event, toState, toParams, options) {
        if (!_.contains(nextState.excludedStates(), toState.name)) {
            nextState.memo('redirect', toState);
        }
    });

    angular.forEach(nextState.redirectEvents(), function(event) {
        $rootScope.$on(event, function(event, args) {
            var redirect = nextState.get('redirect');
            if (!angular.isUndefined(redirect)) {
                $state.go(redirect);
                nextState.clear();
            } else {
                $state.go(nextState.defaultHomeRedirect());
            }
        });
    });

});
