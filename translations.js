// Site copy for the language switch.
//
// English page text lives in index.html and is picked up automatically from
// elements marked with data-i18n="key" or data-i18n-attr="attribute:key".
// "en" below only holds strings that script.js shows on its own (status,
// form messages, menu labels). "el" holds the Greek version of everything.
// Values may contain inline HTML such as <em>, <strong> and &nbsp;.
//
// Each case study has its own "case.<slug>.*" keys; the "work.*" labels are
// shared, so a new project only needs its own text translated (see README.md).

window.TRANSLATIONS = {
  en: {
    "menu.open": "Open menu",
    "menu.close": "Close menu",
    "status.checking": "Checking availability…",
    "status.available": "Available for new projects",
    "status.unavailable": "Not taking new projects",
    "status.unknown": "Availability unknown",
    "quote.showTranslation": "Show English translation",
    "quote.showOriginal": "Show original",
    "form.sending": "Sending…",
    "form.success": "Thanks — your message is on its way. I'll reply by email.",
    "form.error": "Something went wrong. Please try again, or reach me on LinkedIn.",
  },

  el: {
    // Page
    "meta.title": "Dimitris Ebrahim — Full-Stack Προγραμματιστής | CodeByEbra",
    "meta.description":
      "Portfolio του Dimitris Ebrahim (CodeByEbra), full-stack προγραμματιστή στην Ελλάδα που δημιουργεί ασφαλείς και αξιόπιστες web εφαρμογές με Python, Flask και JavaScript.",
    skip: "Μετάβαση στο περιεχόμενο",

    // Header
    "nav.label": "Κύρια πλοήγηση",
    "nav.home": "CodeByEbra — επιστροφή στην αρχή",
    "nav.about": "Σχετικά",
    "nav.work": "Έργα",
    "nav.stack": "Τεχνολογίες",
    "nav.contact": "Επικοινωνία",
    "lang.label": "Γλώσσα",
    "theme.toggle": "Εναλλαγή φωτεινού/σκοτεινού θέματος",
    "menu.open": "Άνοιγμα μενού",
    "menu.close": "Κλείσιμο μενού",

    // Hero
    "hero.eyebrow": "Full-stack προγραμματιστής &middot; Ελλάδα",
    "hero.title": "Web εφαρμογές, <em>από την αρχή ως&nbsp;το&nbsp;τέλος.</em>",
    "hero.lead":
      "Είμαι ο <strong>Dimitris Ebrahim</strong>. Σχεδιάζω και αναπτύσσω ασφαλές, αξιόπιστο λογισμικό web με Python, Flask και JavaScript &mdash; και αναλαμβάνω κάθε έργο από την πρώτη συζήτηση μέχρι τη δημοσίευση και τη συντήρησή του.",
    "hero.ctaWork": "Δείτε τα έργα μου",
    "hero.ctaContact": "Ας συνεργαστούμε",
    "meta.status": "Διαθεσιμότητα",
    "meta.location": "Τοποθεσία",
    "meta.country": "Ελλάδα",
    "meta.localTime": "τοπική ώρα",
    "meta.focus": "Εξειδίκευση",
    "meta.now": "Τώρα",
    "meta.studying": "Σπουδάζω ανάπτυξη λογισμικού &amp; web",
    "status.checking": "Έλεγχος διαθεσιμότητας…",
    "status.available": "Διαθέσιμος για νέα έργα",
    "status.unavailable": "Δεν αναλαμβάνω νέα έργα",
    "status.unknown": "Άγνωστη διαθεσιμότητα",

    // About
    "about.title": "Δημιουργικότητα και λογική, σε λογισμικό που <em>μετράει.</em>",
    "about.intro":
      "Είμαι 18χρονος προγραμματιστής με έδρα την Ελλάδα και σπουδάζω full-stack web development, ανάπτυξη λογισμικού, σχεδιασμό ιστοσελίδων και επιστήμη υπολογιστών.",
    "about.body":
      "Εστιάζω σε καθαρά, responsive και εύχρηστα προϊόντα και τα υλοποιώ από την ιδέα μέχρι τη δημοσίευση &mdash; αξιόπιστα συστήματα backend, προσεγμένες διεπαφές και τη φιλοξενία που τα κρατά online. Εξερευνώ συνεχώς νέες τεχνολογίες, frameworks και πρακτικές σχεδιασμού, και με ενδιαφέρει να προσφέρω πραγματική αξία στους ανθρώπους για τους οποίους δημιουργώ.",
    "about.p1.title": "Πρώτα οι ανάγκες σας",
    "about.p1.text":
      "Ξεκινώ κατανοώντας πώς δουλεύετε και συμφωνούμε αντικείμενο, προθεσμίες και αναθεωρήσεις πριν γραφτεί η πρώτη γραμμή κώδικα.",
    "about.p2.title": "Ασφάλεια από την αρχή",
    "about.p2.text":
      "Ο έλεγχος ταυτότητας, η επικύρωση δεδομένων και η προστασία από XSS και SQL injection είναι μέρος της υλοποίησης από την πρώτη μέρα &mdash; όχι κάτι που προστίθεται στο τέλος.",
    "about.p3.title": "Παράδοση και υποστήριξη",
    "about.p3.text":
      "Αναλαμβάνω τη φιλοξενία και τη δημοσίευση, και κρατώ τα συστήματα σταθερά με προσεκτικές ενημερώσεις, χωρίς απώλεια δεδομένων.",

    // Selected work: labels shared by every case study
    "work.label": "Επιλεγμένα έργα",
    "work.title": "Πραγματικός πελάτης, πραγματικό έργο, <em>παραδομένο.</em>",
    "work.features": "Βασικές λειτουργίες",
    "work.meta.client": "Πελάτης",
    "work.meta.role": "Ρόλος",
    "work.meta.stack": "Τεχνολογίες",
    "work.meta.status": "Κατάσταση",
    "work.meta.links": "Σύνδεσμοι",
    "work.visit": "Επίσκεψη ιστότοπου",
    "work.source": "Πηγαίος κώδικας",
    "work.more": "Διαβάστε περισσότερα για το έργο",
    "quote.showTranslation": "Εμφάνιση ελληνικής μετάφρασης",
    "quote.showOriginal": "Εμφάνιση πρωτοτύπου",

    // Case: elmylonas.gr
    "case.elmylonas.note": "Παρουσίαση έργου",
    "case.elmylonas.videoTitle": "Βίντεο παρουσίασης του elmylonas.gr",
    "case.elmylonas.module.public": "Δημόσιος ιστότοπος",
    "case.elmylonas.module.admin": "Πίνακας διαχείρισης",
    "case.elmylonas.module.resources": "Εκπαιδευτικό υλικό",
    "case.elmylonas.module.exams": "Θέματα εξετάσεων",
    "case.elmylonas.module.quizzes": "Κουίζ",
    "case.elmylonas.module.announcements": "Ανακοινώσεις",
    "case.elmylonas.kicker": "Freelance &middot; Πρώτο έργο για πελάτη",
    "case.elmylonas.intro1":
      "Ο επίσημος ψηφιακός χώρος του Λευτέρη Μυλωνά, οικονομολόγου και καθηγητή στη δευτεροβάθμια εκπαίδευση. Τον δημιούργησα ως ολοκληρωμένη επαγγελματική παρουσία: δημόσιο ιστότοπο για μαθητές και γονείς, με ασφαλή πίνακα διαχείρισης για το περιεχόμενο.",
    "case.elmylonas.intro2":
      "Ο διαχειριστής μπορεί να συνδεθεί, να ανεβάσει και να ενημερώσει εκπαιδευτικό υλικό, να διαχειριστεί θέματα εξετάσεων και να δημοσιεύσει ανακοινώσεις χωρίς να αγγίξει κώδικα &mdash; κάνοντας ένα στατικό portfolio ζωντανό εργαλείο που εξελίσσεται μαζί με τη δουλειά του εκπαιδευτικού.",
    "case.elmylonas.role": "Σχεδιασμός, ανάπτυξη, φιλοξενία &amp; συντήρηση",
    "case.elmylonas.status": "Υπό συντήρηση",
    "case.elmylonas.quoteRole": "Οικονομολόγος εκπαιδευτικός",
    "case.elmylonas.platform.title": "Η πλατφόρμα",
    "case.elmylonas.platform.text":
      "Οι επισκέπτες μπορούν να δουν το ακαδημαϊκό υπόβαθρο του εκπαιδευτικού, να κατεβάσουν εκπαιδευτικό υλικό και να βρουν πληροφορίες για ιδιαίτερα μαθήματα, σε έναν σχεδιασμό που δίνει προτεραιότητα στη σαφήνεια, την εμπιστοσύνη και την προσβασιμότητα. Ενσωματωμένοι τρόποι επικοινωνίας (email, τηλέφωνο, social media) και υποστήριξη τηλεκπαίδευσης μέσω Zoom κάνουν την επικοινωνία με τους μαθητές απλή.",
    "case.elmylonas.learned.title": "Τι έμαθα",
    "case.elmylonas.learned.text1":
      "Η πρώτη μου ευκαιρία ως freelancer ήρθε από τον καθηγητή μου στα οικονομικά, που μου εμπιστεύτηκε τη δημιουργία και τη συντήρηση μιας web εφαρμογής για τις ανάγκες του. Αυτό σήμαινε να δουλέψω ταυτόχρονα ως developer και ως πάροχος υπηρεσιών: επικοινωνία με τον πελάτη, καταγραφή απαιτήσεων, τήρηση προθεσμιών και αναθεωρήσεις, χωρίς να χάνω τη συνολική εικόνα.",
    "case.elmylonas.learned.text2":
      "Σε τεχνικό επίπεδο, συνδύασα Python (Flask) και JavaScript σε μια responsive full-stack εφαρμογή, υλοποίησα ασφαλή έλεγχο ταυτότητας και την προστάτευσα από συνηθισμένες ευπάθειες όπως XSS και SQL injection. Έμαθα να διαχειρίζομαι προσεκτικά τη βάση δεδομένων σε μεγάλες αναβαθμίσεις, ώστε να μη χαθούν ποτέ δεδομένα, και ανέλαβα τη φιλοξενία, τη δημοσίευση και την παρακολούθηση της εφαρμογής σε παραγωγή &mdash; όπου τη διατηρώ σταθερή μέχρι σήμερα.",

    // Stack
    "stack.title": "Τα εργαλεία <em>που χρησιμοποιώ.</em>",
    "stack.languages": "Γλώσσες",
    "stack.data": "Δεδομένα",
    "stack.previously": "Παλαιότερα",

    // Contact
    "contact.title": "Έχετε κάποιο έργο στο μυαλό σας; <em>Ας&nbsp;μιλήσουμε.</em>",
    "contact.intro":
      "Πείτε μου τι θέλετε να φτιάξετε &mdash; έναν νέο ιστότοπο, ένα εσωτερικό εργαλείο ή κάτι που χρειάζεται διόρθωση. Θα σας απαντήσω μέσω email.",
    "form.name": "Όνομα",
    "form.subject": "Θέμα",
    "form.optional": "Προαιρετικό",
    "form.message": "Μήνυμα",
    "form.send": "Αποστολή μηνύματος",
    "form.sending": "Αποστολή…",
    "form.success": "Ευχαριστώ! Το μήνυμά σας στάλθηκε και θα σας απαντήσω μέσω email.",
    "form.error": "Κάτι πήγε στραβά. Δοκιμάστε ξανά ή στείλτε μου μήνυμα στο LinkedIn.",

    // Footer
    "footer.top": "Στην αρχή &uarr;",
  },
};
