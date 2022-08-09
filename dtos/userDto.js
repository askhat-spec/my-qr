module.exports = class UserDto {
    username;
    email;
    id;
    roles;

    constructor(model) {
        this.username = model.username;
        this.email = model.email;
        this.id = model.id;
        this.roles = model.roles;
    }
}