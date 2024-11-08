import Array "mo:base/Array";

actor {
    // Stable variable to persist names across upgrades
    stable var submittedNames : [Text] = [];
    
    // Update call to greet and store name
    public shared(msg) func greet(name : Text) : async Text {
        submittedNames := Array.append(submittedNames, [name]);
        return "Hello, " # name # "!";
    };

    // Query to get all submitted names
    public query func getSubmittedNames() : async [Text] {
        submittedNames
    };
}