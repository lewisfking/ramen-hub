
expId=0;
function Experience(username, barcode, note){
    this.id=expId++;
    this.username = username;
    this.barcode = barcode;
    this.note = note;
}
for (i=0;i<100;i++){

    var e = new Experience("lou", 123456, "tummy hurt");
    console.log(e);
}