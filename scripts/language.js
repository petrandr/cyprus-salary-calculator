// main.js

const translations = {
    en: {
        mainTitle: "Cyprus Net Salary Calculator",
        subtitle: "Calculate your net income in Cyprus with accurate deductions for Social Insurance, GHS, and income tax",
        salaryCalculatorTitle: "Salary Calculator",
        howItWorksButton: "How It Works",
        printButton: "Print",
        grossSalaryLabel: "Gross Salary",
        lifeInsuranceLabel: "Life Insurance Premium",
        providentFundLabel: "Provident Fund",
        unionLabel: "Union",
        otherDeductionsLabel: "Other Tax Deductions",
        additionalOptionsLabel: "Additional Options",
        thirteenSalaryLabel: "Thirteen salary",
        annualAmountOnlyLabel: "Annual amount only",
        enterAmountPlaceholder: "Enter amount",
        enterPercentagePlaceholder: "Enter percentage",
        annualAmountPlaceholder: "Annual amount",
        calculateButton: "Calculate Net Salary",
        // Table translations
        annuallyLabel: "Annually",
        monthlyLabel: "Monthly",
        grossLabel: "Gross",
        taxableLabel: "Taxable Income",
        taxLabel: "Tax",
        socialInsuranceLabel: "Social Insurance",
        gesyLabel: "General Healthcare System (GHS)",
        netLabel: "Net",
        totalDeductionsLabel: "Total Deductions",
        deductionsNoticeLabel: "Excludes income tax",
        salaryBreakdownTitle: "Salary Breakdown",
        taxBreakdownTitle: "Tax Breakdown (Updated: Jan 2026)",
        howItWorksTitle: "How It Works",
        explanationIntro: "This calculator helps you determine your net salary in Cyprus by deducting Social Insurance, the General Healthcare System (GHS), income tax, and any other optional or mandatory contributions from your gross salary.",
        grossSalaryTitle: "Gross Salary",
        grossSalaryText: "Your total salary before any deductions. You can enter it monthly or yearly.",
        lifeInsuranceTitle: "Life Insurance Premium",
        lifeInsuranceText: "The amount you pay for a life insurance policy. Some or all of this may be tax-deductible (depending on the legal limits). Enter it monthly or yearly.",
        providentFundTitle: "Provident Fund",
        providentFundText: "A retirement or savings plan (often employer-sponsored). The contribution is typically a percentage of your gross salary and may reduce your taxable income.",
        unionTitle: "Union",
        unionText: "If you belong to a professional union or association, you might pay a percentage of your salary as union fees. These fees can sometimes be deducted from your taxable income.",
        otherDeductionsTitle: "Other Tax Deductions",
        otherDeductionsText: "Any additional deductible expenses or allowances you can legally claim (e.g., charitable donations, specific social contributions, etc.). Enter the annual total here if applicable.",
        socialInsuranceTitle: "Social Insurance & GHS",
        socialInsuranceText: "Mandatory contributions in Cyprus. The calculator deducts these amounts from your gross salary before calculating taxable income.",
        taxableIncomeTitle: "Taxable Income",
        taxableIncomeText: "Taxable Income is calculated as: Gross Salary - (Social Insurance + GHS + Life Insurance + Provident Fund + Union Fees + Other Deductions). The exact deductibility of each item may depend on current Cyprus tax laws.",
        netSalaryTitle: "Net Salary Calculation",
        netSalaryText: "Once the taxable income is determined, the calculator applies the Cyprus tax brackets to calculate your income tax. Your net salary is then: Gross Salary - (All Contributions + Tax). The result is your take-home pay, shown with both monthly and annual breakdowns.",
        disclaimerText: "Disclaimer: This tool is provided for informational purposes only and we cannot guarantee its validity. Use at your own risk. This site does not collect or store any personal data.",
        lifeInsuranceLimit: "Life Insurance Premium cannot exceed 1/5 of the Gross Salary",
        deductionsWarningTitle: "Tax Deduction Limit Exceeded",
        deductionsWarningText: "Under Cyprus tax law, personal tax deductions are limited to 20% of chargeable income.",
        effectiveDeductionsLabel: "Maximum allowable deductions:",
        excessDeductionsLabel: "Amount exceeding limit:",
        disclaimerNoticeTitle: "Important Notice",
        disclaimerNoticeText: "This is an independent salary calculator and is not an official application from the Cyprus government or any government agency.",
        disclaimerNoticeSubtext: "Results are estimates based on current tax laws and should be verified with official sources or tax professionals.",
        createdByText: "Created by",
    },
    gr: {
        mainTitle: "Υπολογιστής Καθαρού Μισθού Κύπρου",
        subtitle: "Υπολογίστε το καθαρό σας εισόδημα στην Κύπρο με ακριβείς εκπτώσεις για Κοινωνικές Ασφαλίσεις, ΓΕΣΥ και φόρο εισοδήματος",
        salaryCalculatorTitle: "Υπολογιστής Μισθού",
        howItWorksButton: "Πώς Λειτουργεί",
        printButton: "Εκτύπωση",
        grossSalaryLabel: "Μικτός Μισθός",
        lifeInsuranceLabel: "Ασφάλεια Ζωής",
        providentFundLabel: "Ταμείο Προνοίας",
        unionLabel: "Συντεχνία",
        otherDeductionsLabel: "Άλλες Φορολογικές Εκπτώσεις",
        additionalOptionsLabel: "Επιπλέον Επιλογές",
        thirteenSalaryLabel: "Δεκάτος τρίτος μισθός",
        annualAmountOnlyLabel: "Μόνο ετήσιο ποσό",
        enterAmountPlaceholder: "Εισάγετε ποσό",
        enterPercentagePlaceholder: "Εισάγετε ποσοστό",
        annualAmountPlaceholder: "Ετήσιο ποσό",
        calculateButton: "Υπολογίστε Καθαρό Μισθό",
        // Table translations
        grossLabel: "Μικτός",
        taxableLabel: "Φορολογητέο Εισόδημα",
        taxLabel: "Φόρος",
        socialInsuranceLabel: "Κοινωνικές Ασφαλίσεις",
        gesyLabel: "Γενικό Σύστημα Υγείας (ΓΕΣΥ)",
        netLabel: "Καθαρός Μισθός",
        totalDeductionsLabel: "Συνολικές Κρατήσεις",
        deductionsNoticeLabel: "Εξαιρουμένου του φόρου εισοδήματος",
        annuallyLabel: "Ετήσια",
        monthlyLabel: "Μηνιαία",
        salaryBreakdownTitle: "Ανάλυση Μισθού",
        taxBreakdownTitle: "Ανάλυση Φόρου (Ενημερώθηκε: Ιαν 2026)",
        howItWorksTitle: "Πώς Λειτουργεί",
        explanationIntro: "Αυτός ο υπολογιστής σας βοηθά να προσδιορίσετε τον καθαρό σας μισθό στην Κύπρο, αφαιρώντας τις Κοινωνικές Ασφαλίσεις, το Γενικό Σύστημα Υγείας (ΓΕΣΥ), τον φόρο εισοδήματος, καθώς και τυχόν άλλες προαιρετικές ή υποχρεωτικές εισφορές από τον μικτό σας μισθό.",
        grossSalaryTitle: "Μικτός Μισθός",
        grossSalaryText: "Το συνολικό ποσό του μισθού πριν από οποιεσδήποτε κρατήσεις. Μπορείτε να το εισάγετε είτε μηνιαία είτε ετήσια.",
        lifeInsuranceTitle: "Ασφάλεια Ζωής",
        lifeInsuranceText: "Το ποσό που πληρώνετε για ένα συμβόλαιο ασφάλισης ζωής. Μέρος ή ολόκληρο αυτό το ποσό μπορεί να εκπίπτει από τη φορολογία (ανάλογα με τα νόμιμα όρια). Εισάγετέ το σε μηνιαία ή ετήσια βάση.",
        providentFundTitle: "Ταμείο Αποταμίευσης/Προνοίας",
        providentFundText: "Ένα συνταξιοδοτικό ή αποταμιευτικό σχέδιο (συχνά χορηγούμενο από τον εργοδότη). Η εισφορά συνήθως είναι ένα ποσοστό του μικτού μισθού και μπορεί να μειώσει το φορολογητέο εισόδημα.",
        unionTitle: "Συντεχνία",
        unionText: "Αν ανήκετε σε κάποιο επαγγελματικό σωματείο ή ένωση (Συντεχνία), ενδέχεται να πληρώνετε ένα ποσοστό του μισθού σας ως συνδρομή. Αυτές οι συνδρομές μπορούν σε ορισμένες περιπτώσεις να εκπίπτουν από το φορολογητέο εισόδημα.",
        otherDeductionsTitle: "Άλλες Φορολογικές Εκπτώσεις",
        otherDeductionsText: "Οποιαδήποτε επιπρόσθετη έκπτωση ή επίδομα που μπορείτε νόμιμα να διεκδικήσετε (π.χ. φιλανθρωπικές δωρεές, συγκεκριμένες κοινωνικές εισφορές κ.λπ.). Εισάγετε εδώ το ετήσιο σύνολο, εάν υπάρχει.",
        socialInsuranceTitle: "Κοινωνικές Ασφαλίσεις & ΓΕΣΥ",
        socialInsuranceText: "Υποχρεωτικές εισφορές στην Κύπρο. Ο υπολογιστής αφαιρεί αυτά τα ποσά από τον μικτό μισθό πριν υπολογίσει το φορολογητέο εισόδημα.",
        taxableIncomeTitle: "Φορολογητέο Εισόδημα",
        taxableIncomeText: "Το Φορολογητέο Εισόδημα υπολογίζεται ως: Μικτός Μισθός - (Κοινωνικές Ασφαλίσεις + ΓΕΣΥ + Ασφάλεια Ζωής + Ταμείο Αποταμίευσης + Συνδικαλισμός + Άλλες Εκπτώσεις). Το ακριβές ποσό κάθε έκπτωσης εξαρτάται από την εκάστοτε κυπριακή νομοθεσία.",
        netSalaryTitle: "Υπολογισμός Καθαρού Μισθού",
        netSalaryText: "Αφού προσδιοριστεί το φορολογητέο εισόδημα, ο υπολογιστής εφαρμόζει τις κυπριακές φορολογικές κλίμακες για να υπολογίσει τον φόρο εισοδήματος. Ο καθαρός μισθός σας προκύπτει ως: Μικτός Μισθός - (Όλες οι Εισφορές + Φόρος). Το αποτέλεσμα είναι ο μισθός που λαμβάνετε, εμφανιζόμενο με μηνιαία και ετήσια ανάλυση.",
        disclaimerText: "Αποποίηση Ευθύνης: Αυτό το εργαλείο παρέχεται αποκλειστικά για ενημερωτικούς σκοπούς και δεν μπορούμε να εγγυηθούμε την εγκυρότητά του. Χρησιμοποιήστε το με δική σας ευθύνη. Αυτός ο ιστότοπος δεν συλλέγει ούτε αποθηκεύει προσωπικά δεδομένα.",
        lifeInsuranceLimit: "Το ασφάλιστρο ζωής δεν μπορεί να υπερβαίνει το 1/5 του μικτού μισθού.",
        deductionsWarningTitle: "Υπέρβαση Ορίου Φορολογικών Εκπτώσεων",
        deductionsWarningText: "Σύμφωνα με τον κυπριακό φορολογικό νόμο, οι προσωπικές φορολογικές εκπτώσεις περιορίζονται στο 20% του φορολογητέου εισοδήματος.",
        effectiveDeductionsLabel: "Μέγιστες επιτρεπόμενες εκπτώσεις:",
        excessDeductionsLabel: "Ποσό που υπερβαίνει το όριο:",
        disclaimerNoticeTitle: "Σημαντική Ειδοποίηση",
        disclaimerNoticeText: "Αυτός είναι ένας ανεξάρτητος υπολογιστής μισθού και δεν είναι επίσημη εφαρμογή της κυπριακής κυβέρνησης ή οποιουδήποτε κυβερνητικού οργανισμού.",
        disclaimerNoticeSubtext: "Τα αποτελέσματα είναι εκτιμήσεις βασισμένες στους τρέχοντες φορολογικούς νόμους και θα πρέπει να επαληθεύονται με επίσημες πηγές ή φορολογικούς συμβούλους.",
        createdByText: "Δημιουργήθηκε από",
    }
};

function changeLanguage(lang) {
    // Update button states for the new toggle design
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.querySelector(`[data-lang="${lang}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }

    // Update slider position
    const slider = document.querySelector('.language-slider');
    if (slider) {
        if (lang === 'gr') {
            slider.classList.add('greek');
        } else {
            slider.classList.remove('greek');
        }
    }

    // Optionally update the document's language attribute
    document.documentElement.lang = lang;

    // Apply text translations
    Object.keys(translations[lang]).forEach(key => {
        document.querySelectorAll(`#${key}, .${key}`).forEach(el => {
            el.innerText = translations[lang][key];
        });
    });

    // Handle placeholder translations
    const placeholderMappings = {
        'grossSalary': 'enterAmountPlaceholder',
        'lifeInsurance': 'enterAmountPlaceholder',
        'providentFund': 'enterPercentagePlaceholder',
        'union': 'enterPercentagePlaceholder',
        'otherDeductions': 'annualAmountPlaceholder'
    };

    Object.keys(placeholderMappings).forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.placeholder = translations[lang][placeholderMappings[inputId]];
        }
    });

    // Store the selected language in localStorage
    localStorage.setItem('preferredLanguage', lang);
}

document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the stored language or default to 'en'
    const defaultLang = localStorage.getItem('preferredLanguage') || 'en';

    // Initialize the toggle instead of the old select
    changeLanguage(defaultLang);
});
