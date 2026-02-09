import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import Time "mo:core/Time";
import Array "mo:core/Array";
import AccessControl "authorization/access-control";

import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";


actor {
  include MixinStorage();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type Response = {
    timestamp : Time.Time;
    answer : Bool;
  };

  public type UserProfile = {
    name : Text;
  };

  let responses = Map.empty<Principal, Response>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func fetchLatestResponse() : async ?Response {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view responses");
    };
    responses.get(caller);
  };

  public shared ({ caller }) func submitResponse(answer : Bool) : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("Anonymous users cannot submit responses.");
    };
    let response : Response = {
      timestamp = Time.now();
      answer;
    };
    responses.add(caller, response);
  };

  public query ({ caller }) func fetchLatestResponseForPrincipal(principal : Principal) : async ?Response {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can see other user responses.");
    };
    responses.get(principal);
  };

  public shared ({ caller }) func fetchAllResponses() : async [(Principal, Response)] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can see all responses.");
    };
    responses.toArray();
  };

  public query ({ caller }) func fetchAllResponsesAsArray() : async [Response] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can see all responses.");
    };
    responses.values().toArray();
  };
};

