function uuidv4() {
    var kore_uuid = localStorage.getItem('kore_uuid');
    if (kore_uuid) {
        return kore_uuid;
    } else {
        kore_uuid = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        )
        localStorage.setItem('kore_uuid', kore_uuid);
        return kore_uuid;
    }
}