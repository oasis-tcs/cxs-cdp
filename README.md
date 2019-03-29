## README

Members of the <a href="https://www.oasis-open.org/committees/cxs/">OASIS Context Server (CXS) TC</a> 
create and manage technical content in this TC GitHub repository (<a href="https://github.com/oasis-tcs/cxs-cdp">https://github.com/oasis-tcs/cxs-cdp</a>) as part of the TC's chartered work (<i>i.e.</i>, the program of work and deliverables described in its <a href="https://www.oasis-open.org/committees/cxs/charter.php">charter</a>).

OASIS TC GitHub repositories, as described in <a href="https://www.oasis-open.org/resources/tcadmin/github-repositories-for-oasis-tc-members-chartered-work">GitHub Repositories for OASIS TC Members' Chartered Work</a>, are governed by the OASIS <a href="https://www.oasis-open.org/policies-guidelines/tc-process">TC Process</a>, <a href="https://www.oasis-open.org/policies-guidelines/ipr">IPR Policy</a>, and other policies, similar to TC Wikis, TC JIRA issues tracking instances, TC SVN/Subversion repositories, etc. While they make use of public GitHub repositories, these TC GitHub repositories are distinct from <a href="https://www.oasis-open.org/resources/open-repositories">OASIS Open Repositories</a>, which are used for development of open source <a href="https://www.oasis-open.org/resources/open-repositories/licenses">licensed</a> content.

## Description

The Context Server Technical committee is developing the Customer Data Platform specification. This repository contains both the normative
specification documents as well as an associated GraphQL Javascript API demo.

## Contributions

As stated in this repository's <a href="https://github.com/oasis-tcs/cxs-cdp/blob/master/CONTRIBUTING.md">CONTRIBUTING file</a>, 
contributors to this repository are expected to be Members of the OASIS Context Server (CXS) TC, for any substantive change requests. 

Anyone wishing to contribute to this GitHub project and <a href="https://www.oasis-open.org/join/participation-instructions">participate</a> in the TC's technical activity is invited to join as an OASIS TC Member.  Public feedback is also accepted, 
subject to the terms of the <a href="https://www.oasis-open.org/policies-guidelines/ipr#appendixa">OASIS Feedback License</a>.

## Licensing

Please see the <a href="https://github.com/oasis-tcs/dss-x-spec/blob/master/LICENSE.md">LICENSE</a> file for description of the license terms and OASIS policies applicable to the TC's work in this GitHub project. Content in this repository is intended to be part of the CXS TC's permanent record of activity, visible and freely available for all to use, subject to applicable OASIS policies, as presented in the 
repository <a href="https://github.com/oasis-tcs/dss-x-spec/blob/master/LICENSE.md">LICENSE</a> file.

## Further Description of this Repository

[Any narrative content may be provided here by the TC, for example, if the Members wish to provide an 
extended statement of purpose.]

## Contact

Please send questions or comments about <a href="https://www.oasis-open.org/resources/tcadmin/github-repositories-for-oasis-tc-members-chartered-work">OASIS TC GitHub repositories</a> to the <a href="mailto:tc-admin@oasis-open.org">OASIS TC Administrator</a>.  For questions about content in this repository, please contact the TC Chair or Co-Chairs as listed on the the CXS TC's <a href="https://www.oasis-open.org/committees/cxs/">home page</a>.

# Customer Data Platform GraphQL API OASIS Standard
The new GraphQL API for the OASIS CXS Customer Data Platform specification, including sample test implementation
in Javascript.

This work is being done by the OASIS Context Server Technical Committee (see https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=cxs). The specification was renamed to the Customer Data Platform specification as this term has emerged recently as a standard denomination for the work started initially as the Context Server.

You can find work-in-progress snapshots of the current draft being work on at the following location:

    https://sergehuber.github.io/


## Specification document generation

Simply launch the generation of the specification document into HTML and PDF by using the following command:

    ./gradlew asciidoctor

This will generate the HTML version of the ASCII Doctor specification in the following directory:

    build/docs

## Sample server implemented with NodeJS

NOTE: The sample server does not store or process any data. It only acts as a way to browse and play with the API

### Requirements

- NodeJS 6.9+
- NPM 4.1+

### Building and launching

To test the server simply launch

    cd server
    npm install
    npm start

You can then connect a browser to the following URL:

    http://localhost:4000
    
### OASIS CXS TC Group Notes

A copy of the HTML for the group notes of the OASIS CXS TC is stored in the `oasis-cxs-tc/group-notes.html` file. This 
makes it easier to maintain this file as the KWS interface is tedious to use. Also this guarantees we have versioning
for this document.
