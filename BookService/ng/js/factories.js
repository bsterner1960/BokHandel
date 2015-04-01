var standardMethods = {
    'create': { method: 'POST' },
    'index': { method: 'GET', isArray: true },
    'show': { method: 'GET', isArray: false },
    'update': { method: 'PUT' },
    'destroy': { method: 'DELETE' }
};

app.factory("Book", ["$resource", function ($resource)
{
    return $resource("/api/books/:id", { id: "@id" },standardMethods);
}]);

app.factory("Search", ["$resource", function ($resource)
{
    return $resource("/api/search/:searchValues", { whatToSearchFor: "@whatToSearchFor", searchValues: "@searchValues" }, standardMethods);
}]);

app.factory("Authors", ["$resource", function ($resource)
{
    return $resource("/api/authors/:id", { id: "@id" }, standardMethods);
}]);

app.factory("Genres", ["$resource", function ($resource)
{
        return $resource("/api/genres/:id", { id: "@id" }, standardMethods);
}]);