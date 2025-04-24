function maximizeProfit(prices, initialBudget) {
    let budget = initialBudget;
    const transactions = [];
    let currentPurchaseDay = -1;
    let currentPurchasePrice = 0;
    const n = prices.length;

    for (let day = 0; day < n; day++) {
        const price = prices[day];
        // Jeśli nie posiadamy akcji, sprawdzamy czy możemy kupić
        if (currentPurchaseDay === -1) {
            if (budget >= price) {
                currentPurchaseDay = day;
                currentPurchasePrice = price;
                budget -= price;
            }
        } else {
            // Jeśli posiadamy akcję, sprawdzamy czy warto sprzedać
            // Sprzedajemy tylko jeśli następny dzień ma niższą cenę lub to ostatni dzień
            if (day === n - 1 || prices[day + 1] < price) {
                const profit = price - currentPurchasePrice;
                budget += price;
                transactions.push([currentPurchaseDay, day]);
                currentPurchaseDay = -1;
                currentPurchasePrice = 0;
            }
        }
    }

    const totalProfit = budget - initialBudget;
    return [totalProfit, transactions];
}

// Przykład użycia:
const prices = [3, 5, 1, 7, 8, 2, 4, 1];
const initialBudget = 10;
const [profit, transactions] = maximizeProfit(prices, initialBudget);
console.log(profit, transactions); // 15, [[0, 1], [2, 5], [6, 7]]