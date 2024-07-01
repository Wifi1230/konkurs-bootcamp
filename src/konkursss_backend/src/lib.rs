use std::cell::RefCell;

thread_local! {// Define a thread-local storage (TLS) variable WPISY, which holds a RefCell containing a Vec of Strings.
    static WPISY: RefCell<Vec<String>> = RefCell::default();
}

#[ic_cdk::update]
fn dodaj_wpis(wpis: String) {
    WPISY.with(|wpisy| {// Access the thread-local WPISY variable.
        wpisy.borrow_mut().push(wpis)// Borrow a mutable reference to the Vec inside WPISY and push the new entry (wpis) into it.
    });
}

#[ic_cdk::query]
fn odczytaj_wpisy() -> Vec<String> {
    WPISY.with(|wpisy| {// Access the thread-local WPISY variable.
    wpisy.borrow().clone()// Borrow an immutable reference to the Vec inside WPISY and clone it to return.
    })
}

#[ic_cdk::update]
fn usun_wpis(id_wpisu: usize) {// Access the thread-local WPISY variable.
    WPISY.with(|wpisy| {// Borrow a mutable reference to the Vec inside WPISY and remove the entry at the specified index (id_wpisu).
    wpisy.borrow_mut().remove(id_wpisu)
    });
}

#[ic_cdk::update]
fn edytuj_wpis(id_wpisu: usize, nowy_wpis: String){
    WPISY.with(|wpisy|{// Access the WPISY variable, which is assumed to be a thread-local storage containing the entries.
        let mut binding=wpisy.borrow_mut(); // Borrow the mutable reference to the entries (wpisy).
        let wpis = binding.get_mut(id_wpisu);// Get a mutable reference to the entry at the given index (id_wpisu).
        let stary_wpis=wpis.unwrap();// Unwrap the Option to get the old entry, assuming the entry exists at the given index.
        *stary_wpis = nowy_wpis;// Replace the old entry with the new entry (nowy_wpis).
    });
}