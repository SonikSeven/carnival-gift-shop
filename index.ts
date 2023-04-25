import * as readlineSync from 'readline-sync';

type Tickets = {amount: number};
type Gift = {
    name: string;
    cost: number;
};
type Gifts = Record<string, Gift>;

function displayGifts(gifts: Gifts) {
    console.log("Here's the list of gifts:\n");
    for (const [id, gift] of Object.entries(gifts)) {
        console.log(`${id}- ${gift["name"]}, Cost: ${gift["cost"]} tickets`);
    }
}

function showTickets(tickets: Tickets) {
    console.log(`Total tickets: ${tickets["amount"]}`);
}

function buyGift(gifts: Gifts, tickets: Tickets) {
    if (Object.keys(gifts).length === 0) {
        return console.log("Wow! There are no gifts to buy.");
    }
    let answer = Number(readlineSync.question("Enter the number of the gift you want to get:"));
    let gift = gifts[answer];
    if (isNaN(answer)) {
        return console.log("Please enter a valid number!");
    } else if (typeof gift === "undefined") {
        return console.log("There is no gift with that number!");
    } else if (gift["cost"] > tickets["amount"]) {
        return console.log("You don't have enough tickets to buy this gift.");
    }
    tickets["amount"] = tickets["amount"] - gift["cost"];
    console.log(`Here you go, one ${gift["name"]}!`);
    delete gifts[answer];
    showTickets(tickets);
}

function addTickets(tickets: Tickets) {
    let answer = Number(readlineSync.question("Enter the ticket amount: "));
    if (isNaN(answer) || (answer < 0) || (answer > 1000)) {
        return console.log("Please enter a valid number between 0 and 1000.");
    }
    tickets["amount"] = tickets["amount"] + answer;
    showTickets(tickets);
}

function main() {
    let tickets = {"amount": 0};
    let gifts = {
        1: {name: "Teddy Bear", cost: 10},
        2: {name: "Big Red Ball", cost: 5},
        3: {name: "Huge Bear", cost: 50},
        4: {name: "Candy", cost: 8},
        5: {name: "Stuffed Tiger", cost: 15},
        6: {name: "Stuffed Dragon", cost: 30},
        7: {name: "Skateboard", cost: 100},
        8: {name: "Toy Car", cost: 25},
        9: {name: "Basketball", cost: 20},
        10: {name: "Scary Mask", cost: 75}
    };

    console.log(`WELCOME TO THE CARNIVAL GIFT SHOP!
Hello friend! Thank you for visiting the carnival!`);
    displayGifts(gifts);

    while (true) {
        switch (Number(readlineSync.question(`\nWhat do you want to do?
1-Buy a gift 2-Add tickets 3-Check tickets 4-Show gifts 5-Exit the shop\n`))) {
            case 1:
                buyGift(gifts, tickets);
                continue;
            case 2:
                addTickets(tickets);
                continue;
            case 3:
                showTickets(tickets);
                continue;
            case 4:
                displayGifts(gifts);
                continue;
            case 5:
                return console.log("Have a nice day!");
            default:
                console.log("Please enter a valid number!");
        }
    }
}

main();
