console.log(GA_MEASUREMENT_ID);
document.addEventListener('DOMContentLoaded', function () {
    // Select all input and select elements
    const elements = document.querySelectorAll('input, select:not(#languageSelect)');

    // Attach the calculateNetSalary function to the 'input' event
    elements.forEach(element => {
        element.addEventListener('input', calculateNetSalary);
    });

    const collapseElement = document.getElementById("collapseHowItWorks");
    const iconElement = document.querySelector("#howItWorks i");

    if (collapseElement && iconElement) {
        collapseElement.addEventListener("show.bs.collapse", function () {
            iconElement.classList.remove("fa-rotate-180");
        });

        collapseElement.addEventListener("hide.bs.collapse", function () {
            iconElement.classList.add("fa-rotate-180");
        });
    }
});

document.addEventListener("click", function (event) {
    if (event.target.classList.contains("printCard")) {
        // Find the closest parent card
        var card = event.target.closest(".card");
        if (card) {
            printCard(card);
        }
    }
});


// Formats a number to a string in US locale with exactly 2 decimal places.
function formatNumber(num) {
    return num.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Converts a given value to a number. If conversion fails, returns a default value (0 by default).
function toNumber(value, defaultVal = 0) {
    const num = parseFloat(value);
    return isNaN(num) ? defaultVal : num;
}

// Main function to calculate net salary based on various inputs and deductions.
function calculateNetSalary() {
    // Show a loading indicator while processing.
    // document.getElementById('loading').style.display = 'block';

    // Use a timeout to simulate a brief processing delay (500ms).
    setTimeout(() => {
        // Retrieve user inputs from the DOM.
        let salaryType = document.getElementById('salaryType').value;
        let gross = parseFloat(document.getElementById('grossSalary').value);
        let insuranceType = document.getElementById('insuranceType').value;
        let lifeInsurance = toNumber(document.getElementById('lifeInsurance').value);
        let providentFund = toNumber(document.getElementById('providentFund').value);
        let union = toNumber(document.getElementById('union').value);
        let otherDeductions = toNumber(document.getElementById('otherDeductions').value);
        let thirteenSalary = document.getElementById('thirteenSalary').checked;

        if (!gross) return;

        let numberOfSalaries = 12;

        if (thirteenSalary) {
            numberOfSalaries = 13;
        }

        let grossSalary = gross;

        // Convert monthly salary to annual if necessary.
        if (salaryType === 'monthly') {
            grossSalary *= numberOfSalaries;
        }

        let lifeInsuranceLimit = grossSalary / 5;

        // Convert monthly life insurance to annual if necessary.
        if (insuranceType === 'monthly') {
            lifeInsurance *= 12;
        }

        // Remove the incorrect individual life insurance validation
        const lifeInsuranceField = document.getElementById('lifeInsurance');
        const lifeInsuranceLimitMsg = document.getElementById('lifeInsuranceLimit');

        // Always remove the old error since it's not the correct validation
        lifeInsuranceField.classList.remove("is-invalid");
        if (lifeInsuranceLimitMsg) {
            lifeInsuranceLimitMsg.classList.remove("show");
        }

        // Calculate the annual provident fund amount as a percentage of gross salary.
        let providentFundAmount = 0.00;
        if (providentFund) {
            providentFundAmount = ((grossSalary / numberOfSalaries) * 12) * (providentFund / 100);
        }

        // Calculate the annual union fee amount as a percentage of gross salary.
        let unionAmount = 0.00;
        if (union) {
            unionAmount = grossSalary * (union / 100);
        }

        // Calculate social insurance and Gesy (healthcare) contributions.
        let socialInsurance = grossSalary * 0.088;
        let gesy = grossSalary * 0.0265;

        // Calculate the taxable income by subtracting various deductions.
        // Note: We'll recalculate this after checking the 20% limit
        let preliminaryTaxableIncome = grossSalary - (
            socialInsurance + gesy + lifeInsurance + unionAmount + providentFundAmount + otherDeductions
        );

        // Calculate total deductions and percentage (excluding tax)
        let totalDeductions = socialInsurance + gesy + providentFundAmount + unionAmount + lifeInsurance;
        let deductionsPercentage = (totalDeductions / grossSalary) * 100;

        // Check if total deductions exceed 20% limit according to Cyprus tax law
        const maxDeductionsPercentage = 20;
        const maxDeductionsAmount = grossSalary * 0.20;
        let deductionsWarning = null;
        let effectiveDeductions = totalDeductions;

        if (deductionsPercentage > maxDeductionsPercentage) {
            effectiveDeductions = maxDeductionsAmount;
            const excessAmount = totalDeductions - maxDeductionsAmount;
            deductionsWarning = {
                effectiveAmount: effectiveDeductions,
                excessAmount: excessAmount,
                effectivePercentage: maxDeductionsPercentage
            };
        }

        // Calculate the ACTUAL taxable income using effective deductions (capped at 20%)
        let taxableIncome = grossSalary - effectiveDeductions;

        // Define the tax brackets with their income ranges and corresponding tax rates.
        let taxBrackets = [
            { min: 0, limit: 22000, rate: 0 },
            { min: 22001, limit: 32000, rate: 0.2 },
            { min: 32001, limit: 42000, rate: 0.25 },
            { min: 42001, limit: 72000, rate: 0.3 },
            { min: 72001, limit: Infinity, rate: 0.35 }
        ];

        // Initialize total tax and HTML string for the breakdown table.
        let tax = 0;
        let breakdownHTML = "";

        // Loop through each tax bracket to calculate the tax for the portion of income in that bracket.
        for (let bracket of taxBrackets) {
            // Only process if taxable income exceeds the minimum of the bracket.
            if (taxableIncome > bracket.min) {
                // Determine how much of the income falls within this bracket.
                let taxableAmount = Math.min(taxableIncome, bracket.limit) - bracket.min;
                // Calculate the tax for this bracket.
                let taxAmount = taxableAmount * bracket.rate;
                // Add the tax from this bracket to the total tax.
                tax += taxAmount;

                // Append the breakdown information for this bracket as a table row.
                breakdownHTML += `<tr class="border-b border-gray-100">
                      <td class="py-2 px-2">€${formatNumber(bracket.min)}</td>
                      <td class="py-2 px-2">€${formatNumber(bracket.limit === Infinity ? 999999 : bracket.limit)}</td>
                      <td class="py-2 px-2">${bracket.rate * 100}%</td>
                      <td class="py-2 px-2">€${formatNumber(taxAmount)}</td>
                    </tr>`;
            }
        }

        // Calculate the net salary by subtracting effective deductions and tax from the gross salary.
        // Note: We use effectiveDeductions (capped at 20%) for tax calculation, but actual deductions for net salary
        let netSalary = grossSalary - (socialInsurance + gesy + providentFundAmount + unionAmount + tax);

        // Hide the loading indicator now that processing is complete.
        // document.getElementById('loading').style.display = 'none';

        // Display the results container and the breakdown table.
        const resultsContainer = document.getElementById('resultsContainer');
        const breakdownTable = document.getElementById('breakdownTable');

        if (resultsContainer) {
            resultsContainer.classList.remove('hidden');
        }

        if (breakdownTable) {
            breakdownTable.style.display = 'table';
        }

        // Populate the tax breakdown table with the generated HTML.
        const taxBreakdownElement = document.getElementById('taxBreakdown');
        if (taxBreakdownElement) {
            taxBreakdownElement.innerHTML = breakdownHTML;
        }

        // Display various annual amounts formatted with the Euro symbol.
        const annualElements = {
            'annualGross': grossSalary,
            'annualTaxable': taxableIncome,
            'annualTax': tax,
            'annualSocialInsurance': socialInsurance,
            'annualGesy': gesy,
            'annualProvidentFund': providentFundAmount,
            'annualUnion': unionAmount,
            'annualTotalDeductions': effectiveDeductions, // Use effective deductions (capped at 20%)
            'annualNet': netSalary
        };

        Object.entries(annualElements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.innerText = '€' + formatNumber(value);
            }
        });

        // Display deductions percentage
        const annualDeductionsPercentageElement = document.getElementById('annualDeductionsPercentage');
        if (annualDeductionsPercentageElement) {
            if (deductionsWarning) {
                // Show the effective percentage (20%) when limit is exceeded
                annualDeductionsPercentageElement.innerText = formatNumber(deductionsWarning.effectivePercentage) + '% (capped)';
                annualDeductionsPercentageElement.classList.add('text-orange-600');
            } else {
                annualDeductionsPercentageElement.innerText = formatNumber(deductionsPercentage) + '%';
                annualDeductionsPercentageElement.classList.remove('text-orange-600');
            }
        }

        // Display the monthly amounts by dividing the annual values by the number of salaries.
        const monthlyElements = {
            'monthlyGross': grossSalary / numberOfSalaries,
            'monthlyTaxable': taxableIncome / numberOfSalaries,
            'monthlyTax': tax / numberOfSalaries,
            'monthlySocialInsurance': socialInsurance / numberOfSalaries,
            'monthlyGesy': gesy / numberOfSalaries,
            'monthlyProvidentFund': providentFundAmount / 12,
            'monthlyUnion': unionAmount / numberOfSalaries,
            'monthlyTotalDeductions': effectiveDeductions / numberOfSalaries, // Use effective deductions (capped at 20%)
            'monthlyNet': netSalary / numberOfSalaries
        };

        Object.entries(monthlyElements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.innerText = '€' + formatNumber(value);
            }
        });

        // Display monthly deductions percentage (same as annual)
        const monthlyDeductionsPercentageElement = document.getElementById('monthlyDeductionsPercentage');
        if (monthlyDeductionsPercentageElement) {
            if (deductionsWarning) {
                // Show the effective percentage (20%) when limit is exceeded
                monthlyDeductionsPercentageElement.innerText = formatNumber(deductionsWarning.effectivePercentage) + '% (capped)';
                monthlyDeductionsPercentageElement.classList.add('text-orange-600');
            } else {
                monthlyDeductionsPercentageElement.innerText = formatNumber(deductionsPercentage) + '%';
                monthlyDeductionsPercentageElement.classList.remove('text-orange-600');
            }
        }

        // Handle deductions warning display
        const deductionsWarningElement = document.getElementById('deductionsWarning');
        if (deductionsWarningElement) {
            if (deductionsWarning) {
                deductionsWarningElement.classList.add('show');
                const effectiveAmountElement = document.getElementById('effectiveDeductionsAmount');
                const excessAmountElement = document.getElementById('excessDeductionsAmount');

                if (effectiveAmountElement) {
                    effectiveAmountElement.innerText = '€' + formatNumber(deductionsWarning.effectiveAmount);
                }
                if (excessAmountElement) {
                    excessAmountElement.innerText = '€' + formatNumber(deductionsWarning.excessAmount);
                }
            } else {
                deductionsWarningElement.classList.remove('show');
            }
        }

    }, 100); // Reduced timeout for better responsiveness
}


function printCard(cardElement) {
    // Clone the card to avoid modifying the original
    var clonedCard = cardElement.cloneNode(true);

    // Copy values from input fields, textareas, and selects
    clonedCard.querySelectorAll("input, textarea, select").forEach((el, index) => {
        if (el.type === "checkbox") {
            // Handle checkboxes: Set checked attribute
            if (el.checked) {
                // clonedCard.querySelectorAll("input[type='checkbox']")[index].checked = true;
            } else {
                // clonedCard.querySelectorAll("input[type='checkbox']")[index].checked = false;
            }
        } else if (el.tagName === "TEXTAREA") {
            // Handle textareas
            clonedCard.querySelectorAll("textarea")[index].textContent = el.value;
        } else {
            // Handle inputs and selects
            clonedCard.querySelectorAll("input, select")[index].setAttribute("value", el.value);
        }
    });

    // Get the card content
    var cardContent = clonedCard.innerHTML;

    // Create a new window
    var printWindow = window.open('', '', 'width=800,height=600');

    // Write content to the new window
    printWindow.document.write(`
            <html>
            <head>
                <title>Print</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                </style>
            </head>
            <body>
                <div class="card text-dark bg-light">
                    ${cardContent}
                </div>
                <script>
                    window.onload = function() { window.print(); };
                <\/script>
            </body>
            </html>
        `);

    // Close document to finish loading
    printWindow.document.close();
}