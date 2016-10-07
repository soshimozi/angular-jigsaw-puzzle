'use strict';

function TrustedFilter($sce) {

    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}

TrustedFilter.$inject = ['$sce'];

module.exports = TrustedFilter;
