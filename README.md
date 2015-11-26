[![Build Status](https://travis-ci.org/nghiattran/angular-parse.svg?branch=travis)](https://travis-ci.org/nghiattran/angular-parse)
[![Coverage Status](https://coveralls.io/repos/nghiattran/angular-parse/badge.svg?branch=master&service=github)](https://coveralls.io/github/nghiattran/angular-parse?branch=master)

# Angular-parse
> Angular-parse is an Angularjs service to connect to Parse database much more easily and quickly by bypassing entire server side, everything will be handle on client side with Angularjs. This project is only intended for building MVP or prototype.
###Project is terminated, use [Python-parse](https://github.com/nghiattran/python-parse) instead 

[![image](angular-parse.png)]()

[Get started](https://github.com/nghiattran/python-parse)&nbsp;&nbsp;&nbsp;[Demo](https://github.com/nghiattran/python-parse)

# Get started

### Set keys (you can find your keys in Settings->Keys)
	parseServices.setKeysSimple(applicationId, javascriptKey);
You can find your keys in Settings->Keys

### Set pointer type
	parseServices.setPointerMappingSimple(dataStructure);

dataStructure has to be an object containing column names and where the pointers pointing to

Example:
	dataStructure = {
		createdBy: '_User',
		onShelf: 'Shelves'
	}

createdBy and onShelf are column name which are pointing to _User and Shelves classes respectively

# Requests

### Get

	var params = { 
	    where: {
	    	createdBy: "objectId of an entry"
	    },
	    include: ['createdBy'],
	    limit: 5
	}
	parseServices.get(class_name, params).then(function(response){
		if (!response.results.error) {
			# do something
		} else{
			# Error
		}
	})

* 'params' structure 

	params
		\- where	(Arguments for query)
		\- order 	(Specify a field to sort by)
		\- limit	(Limit the number of objects returned by the query)
		\- skip 	(Use with limit to paginate through results)
		\- keys 	(Restrict the fields returned by the query)
		\- include	(Use on Pointer columns to return the full object)


Angular-parse will converse objectId in 'where' to pointer type. So use

	where: {
    	createdBy: "objectId of an entry"
    },

instead of

	where: {
		__type: "Pointer",
		className: "_User",
    	createdBy: "objectId of an entry"
    },