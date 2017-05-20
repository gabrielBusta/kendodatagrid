/* global $ kendo*/
$(function() {
    var employeeDataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: "https://mwmtest-gabrielbusta.c9users.io/employees/",
                dataType: "json"
            }
        },
        schema: {
            data: function(response) {
                /* Convert the string representation of birth dates into JavaScript Date objects. */
                for (var i = 0; i < response.data.length; i++) {
                    response.data[i].BirthDate = new Date(response.data[i].BirthDate);
                }
                return response.data;
            },
            total: function(response) {
                return response.total;
            },
        },
        pageSize: 100,
        model: {
            fields: {
                FirstName: { type: 'string' },
                LastName: { type: 'string' },
                City: { type: 'string' },
                Title: { type: 'string' },
                BirthDate: { type: 'date'},
            }
        },
    });

    $("#grid").kendoGrid({
        dataSource: employeeDataSource,
        scrollable: true,
        filterable: {
            extra: false,
            operators: {
                string: {
                    eq: "Is equal to",
                    neq: "Is not equal to",
                }
            },
        },
        pageable: true,
        columns: [
            {
                title: "Name",
                width: 160,
                filterable: false,
                template: "#=FirstName# #=LastName#"
            },
            {
                field: "City",
                width: 130,
                filterable: {
                    ui: cityFilter
                }
            },
            {
                field: "Title",
                filterable: {
                    ui: titleFilter
                }
            },
            {
                field: "BirthDate",
                title: "Birth Date",
                format: "{0:MM/dd/yyyy}",
                filterable: {
                    ui: "datepicker",
                }
            },
        ]
    });
});

function titleFilter(element) {
    element.kendoAutoComplete({
        dataSource: new kendo.data.DataSource({
            transport: {
                read: {
                    url: "https://mwmtest-gabrielbusta.c9users.io/titles/",
                    dataType: "json"
                },
            },
            schema: {
                data: function(response) {
                    return response.data;
                },
                total: function(response) {
                    return response.total;
                },
            },
        })
    });
}

function cityFilter(element) {
    element.kendoDropDownList({
        dataSource: new kendo.data.DataSource({
            transport: {
                read: {
                    url: "https://mwmtest-gabrielbusta.c9users.io/cities/",
                    dataType: "json"
                }
            },
            schema: {
                data: function(response) {
                    return response.data;
                },
                total: function(response) {
                    return response.total;
                },
            },
        }),
        optionLabel: "--Select Value--"
    });
}