import * as app from '../../../app';
import defaults from './tabs.json';

/**
 * Tabs
 * 
 * @access public
 * 
 * @param {(String|Object)} els
 * @param {Object} custom
 */
export function tabs(els = 'tabs', custom) {

    custom = app.custom('tabs', custom);

    app.Synergy(els, (el, options) => {
        // Get individual tab items
        const tabItems = function() {
            // get depth of target tab items as tabs may be nested
            const itemDepth = el.component('item')[0].parents().length;
            // get all items of same depth
            return Array.prototype.filter.call(el.component('item'), el => {
                return el.parents().length === itemDepth;
            });
        }

        // Toggle active class
        app.clickHelper(el.component('nav')[0], options.activeClass);

        Array.prototype.forEach.call(el.component('nav')[0].children, (item, index) => {
            item.addEventListener('click', () => {
                // Hide previously selected item
                tabItems().forEach(tab => tab.style.display = 'none');
                // Show new item
                tabItems()[index].style.display = 'block';
            });
        });

    }, defaults, custom);

    app.config.tabs = Object.assign(defaults.tabs, custom);

    return exports;
};