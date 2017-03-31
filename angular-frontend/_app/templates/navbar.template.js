<md-nav-bar md-selected-nav-item="vm.currentNavItem">
    <md-nav-item ng-repeat="item in navItems" md-nav-click="goto('{{item.route}}')" name="{{item.label}}">{{item.label}}</md-nav-item>
</md-nav-bar>
