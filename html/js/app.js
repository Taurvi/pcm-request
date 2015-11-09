/*var creationSuccess = function(data) {
    //console.log("Card created successfully. Data returned:" + JSON.stringify(data));
    console.log(data);
};

var myId = "";

var newCard = {
    idList: sampleRequestList,
    name: "New Test Card",
    desc: "This is the description of our new card.",
    idMembers:"4e6a7fad05d98b02ba00845c,55e89f76c0afedcca5dab125",
    pos: "bottom" // Place this card at the top of our list idList: myList,
};


var testCard = $.param(newCard);

var testPost = function() {
    Trello.post("cards", newCard, creationSuccess);
}

// Gets list of members
var getMemberList = function() {
    Trello.get("boards/" + sampleBoard + "/members", creationSuccess)
}

// Gets labels of board
var getLabelList = function() {
    Trello.get("boards/" + pcmBoard + "/labels", creationSuccess)
}




var getMe = function() {
    Trello.get("members/me", getMyId)
}*/
//  Create Angular App
var ngApp = angular.module('ngApp', ['ngRoute']);

// Stores route information
ngApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/request.html',
            controller: 'CtrlRequest'
        })
});

ngApp.controller('CtrlRequest', ['$scope', '$location', function($scope, $location) {
    $scope.loggedIn = false;

    var pcmBoard = "55c91e3230d86e268422d1b9";
    var sampleBoard = "55e89f76c0afedcca5dab126";

    var pcmRequestList = "55c91ea0ba8d2523ded3bfb3";
    var sampleRequestList = "55e89f76c0afedcca5dab129";

    var authFail = function() {
        console.log("Failed authentication");
    };

    var authorize = function() {
        Trello.authorize({
            type: "popup",
            name: "PCM Request System",
            scope: {
                read: true,
                write: true },
            expiration: "never",
            success: initialize,
            error: authFail
        });
    }

    var initialize = function() {
        Trello.get("boards/" + pcmBoard + "/labels", function(data) {
            console.log('label list', data);
            $scope.loggedIn = true;
            $scope.$apply();
        }, function(err) {
            console.log('error', err);
            if (err.status == '401')
                authorize();
        });
    }

    authorize();

    var error = function(err) {
        console.log(err);
    }


    $scope.parseToFrom = function() {
        if($scope.ngFieldRequestDept && $scope.ngFieldSendDept) {
            var requestFrom = $scope.ngFieldRequestDept;
            var requestTo = $scope.ngFieldSendDept.join(', ');
            return ('[' + requestFrom + ' > ' + requestTo + ']');
        }
    }

    $scope.checkToFrom = function() {
        if($scope.ngFieldRequestDept && $scope.ngFieldSendDept) {
            var requestFrom = $scope.ngFieldRequestDept;
            var requestTo = $scope.ngFieldSendDept;
            return (requestTo.indexOf(requestFrom) >= 0)
        }
    }

    $scope.submitTrello = function() {
        var title = $scope.ngFieldTitle;
        var description = $scope.ngFieldDesc;
        var parsedToFrom = $scope.parseToFrom();

        var formattedTitle = parsedToFrom + ' ' + title;

        var newCard = {
            idList: pcmRequestList,
            name: formattedTitle,
            desc: description,
            pos: "bottom" // Place this card at the top of our list idList: myList,
        };

        Trello.post("cards", newCard, function() {
            alert('success! See trello')
        });

    }


}]);










