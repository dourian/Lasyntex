// Command Class: used to bundle data fetched from SQL database, each field corresponds to a column in
// SQL database

export default class Command {
    constructor(commandName, commandSyntax, commandExample, commandDescription) {
        this.name = commandName;
        this.syntax = commandSyntax;
        this.example = commandExample;
        this.commandDescription = commandDescription;
    }
}