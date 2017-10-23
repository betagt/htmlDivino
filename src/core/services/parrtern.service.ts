export class PatternHelper {

    static facebook() {
        return /((?:https?\:\/\/|www\.)(?:facebook)(?:.com\/)(?:[-a-z0-9]+\.)*[-a-z0-9]+.*?)$/g;
    }

    static twitter() {
        return /((?:https?\:\/\/|www\.)(?:twitter)(?:.com\/)(?:[-a-z0-9]+\.)*[-a-z0-9]+.*?)$/g;
    }

    static googleplus() {
        return /((?:https?\:\/\/|www\.)(?:plus\/)(?:google)(?:.com\/)(?:[-a-z0-9]+\.)*[-a-z0-9]+.*?)$/g;
    }

    static youtube() {
        return /((?:https?\:\/\/|www\.)(?:youtube)(?:.com\/)(?:[-a-z0-9]+\.)*[-a-z0-9]+.*?)$/g;
    }
}