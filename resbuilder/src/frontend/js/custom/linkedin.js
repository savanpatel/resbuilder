function liAuth(){
        IN.User.authorize(function(){
        });
    }
// Setup an event listener to make an API call once auth is complete
function onLinkedInLoad() {
    IN.Event.on(IN, "auth", getProfileData);
}

// Handle the successful return from the API call
function onSuccess(data) {
    console.log(data);
    // pass user info to angular
    angular.element(document.getElementById("resumeBuilderApp")).scope().$apply(
        function($scope) {
            $scope.signInWithLinkedIn(data);
        }
    );
}

// Handle an error response from the API call
function onError(error) {
    console.log(error);
}

// Use the API call wrapper to request the member's basic profile data
function getProfileData() {
    IN.API.Raw("/people/~:(id,first-name,last-name,positions,specialties,email-address)").result(onSuccess).error(onError);
}
