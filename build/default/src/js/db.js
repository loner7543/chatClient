/**
 * Created by User on 003 03.06.17.
 */
var indexedDB 	  = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB,
    IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction,
    baseName = 'good-db';


function logerr(err) {
    console.log(err);
}

function connectDB(f) {
    var request = indexedDB.open(baseName, 2);
    request.onerror = logerr;
    request.onsuccess = function() {
        f(request.result);
    };
    request.onupgradeneeded = function(e) {
        e.currentTarget.result.createObjectStore('categoryStore', {keyPath: 'path', autoIncrement: true});
        e.currentTarget.result.createObjectStore('itemStore', {keyPath: 'path', autoIncrement: true});
        connectDB(f);
    };
}
// возвращает объект из таблицы
function getFile(storeName, file, f) {
    connectDB(function(db) {
        var request = db.transaction([storeName], 'readonly').objectStore(storeName).get(file);
        request.onerror = logerr;
        request.onsuccess = function() {
            f(request.result ? request.result : -1);
        };
    });
}
// возвращает список из табллицы
function getStorage(storeName, f) {
    connectDB(function(db) {
        var rows = [],
            store = db.transaction([storeName], 'readonly').objectStore(storeName);

        if(store.mozGetAll)
            store.mozGetAll().onsuccess = function(e) {
                f(e.target.result);
            };
        else
            store.openCursor().onsuccess = function(e) {
                var cursor = e.target.result;
                if(cursor) {
                    rows.push(cursor.value);
                    cursor.continue();
                } else {
                    f(rows);
                }
            };
    });
}
// добавляет объект
function setFile(storeName, file) {
    connectDB(function(db) {
        var request = db.transaction([storeName], 'readwrite').objectStore(storeName).put(file);
        request.onerror = logerr;
        request.onsuccess = function() {
            return request.result;
        };
    });
}
// удаляет объект
function delFile(storeName, file) {
    connectDB(function(db) {
        var request = db.transaction([storeName], 'readwrite').objectStore(storeName).delete(file.path);
        request.onerror = logerr;
        request.onsuccess = function() {
            console.log('File delete from DB:', file);
        };
    });
}
