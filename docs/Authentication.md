---
title: Authentication
---

![diag](design/design.003.jpeg)

The login/logout actions take place at the server after visiting `/login`,
`/logout` or `/slogout`.

The server performs shibboleth authentication, with credentials coming from the 
[DARIAH Identity provider](https://wiki.de.dariah.eu/display/publicde/DARIAH+AAI+Documentation).

Currently, `/logout` performs a logout from this app, but not from the DARIAH Identity Provider.
To do the latter, one has to go to `/slogout` and close the browser.

User records
-------------
When users log in, their details will be stored in the user table.
This happens on every login, so the user table updates itself when the DARIAH identity provider updates
attributes.
These updates reach our user table only for those users that actually log in, 
at the moment that they do log in.
Most details are provided directly by the DARIAH identity provider upon login.

The system may contain records for users that have never logged in.
This happens when future users of the system are assigned to field values by their email address.
Whenever such a user logs in, the attributes obtained during the authentication will flow into
the incomplete user record if it exists, otherwise a new user record will be made.
The new user will find him/herself in all places where his/her email address had been entered.

### Fields

user field in this app | attribute provided by DARIAH | comments
---|---|---
`eppn` | `eppn` | a string by which the user is identified in the DARIAH context
`email` | `mail` | the email address according to the DARIAH identity provider
`firstName` | `givenName` |
`lastName` | `sn` |
`name` | `cn` | common name, probably just `firstName lastName`
`org` | `o` | organization to which the user is affiliated
`membership` | `isMemberOf` | a semicolon separated string of groups within the DARIAH organization to which the user belongs, e.g. `lr_DARIAH-User`, `humanities-at-scale-contributors`, `dariah-eu-contributors`
`rel` | `affiliation` | the type of relation the user has with DARIAH, such as `member@dariah.eu`

We do not use `unscoped-affiliation`, which is the `affiliation` without the `@dariah.eu` part.

This app adds some fields to a user record:

user field | comments
---|---
`mayLogin` | whether the user is allowed to login. Default `true`, but the back office can use this field to prevent a user from logging in. When a user leaves, we advise to set `mayLogin` to `true`. It is not an option to delete a user, because (s)he can be the creator/modifier of records that are still in the system.
`authority` | the basis on which the identity of the user has been established. See the values below.
`group` | the permission level of this user. See the values below.
`dateLastLogin` | when the user has logged in most recently
`statusLastLogin` | whether the last login attempt was successful

And, like almost all records in the system, some standard fields are added.
You will not find these fields on the interface in most cases,
but it is good to know that they will be recorded in the database.

field | comments
---|---
`creator` | the user that created this user record. The legacy user have `HaSProject` as creator, which is itself a user that cannot login. Other user records do not have a creator. So authenticated users cannot change their user records.
`dateCreated` | when the record was created
`modified` | a list of modification events, having the date of modification and the user who did it for each event.

### User presentation
When a user is presented on the interface, we choose between the following representations, in order
of highest preference first. 

* `name` (coming from the DARIAH attribute `cn` (common name)
* `firstName lastName`
* `email`
* `eppn-autority`

We append ` (org)` if available.

### Values
#### `authority` values

authority | comments
---|---
 | if absent, the user has never been authenticated. Used for people that occur in the system, but have not yet logged in.
`DARIAH` | the user has been logged in by the DARIAH identity provider
`legacy` | the user has been imported from the FileMaker legacy data. This kind of user cannot log in.
`local`  | the user has logged in on the development system. This kind of user should not be present in the production system!

#### `group` values

group | comments
---|---
`public` | unidentified users (the public). No right to edit anything. Can only list/read public information.
`auth` | authenticated user. Can add items and then modify/delete them, within limits. Can see DARIAH internal information (within limits). This is the default group for logged-in users.
`office` | back office users. Can modify records created by others (within limits). Cannot do system-technical things.
`system` | system managers. Can modify system-technical records, within limits.
`root` | Complete rights. Still there are untouchable things, that would compromise the integrity of the system. Even root cannot modify those.
`nobody` | All powerful. You can also destroy the system. Detail: nobody belongs to this group.

Assigning users to groups is subject to permissions, defined by the groups themselves, with a few additional rules:

* nobody can assign anybody to the group `nobody`;
* a person can only assign groups that have at most his/her own power;
* a person can only assign groups to people that have less power than him/herself.

Examples:
* If you are `office`, you cannot make yourself or anyone else `system` or `root`.
* If you are `office`, you cannot assign another member of `office` the group `auth`.
* You cannot demote/promote your peers, or the ones above you.
* You can demote yourself, but not promote yourself.
* You can demote people below you.
* You can promote people below you, but only up to your own level.

A consequence is, that if there is no `root` in the system, nobody can be made `root` from within the system.

When importing data into the system by means of [load.sh](https://github.com/Dans-labs/dariah/blob/master/static/tools/load.sh) you can specify to make a specific user `root`.
Which user that is, is specified in [config.yaml](https://github.com/Dans-labs/dariah/blob/master/static/tools/config.yaml), see `rootUser`.

Once the root user is in place, (s)he can assign system admins and back office people.
Once those are in place, the daily governance of the system can take place.

#### `statusLastLogin` values

statusLastLogin | comments
`Approved` | successful login attempt
`Rejected` | unsuccessful login attempt
