//Part 1

const adventurer = {
    name: "Robin",
    health: 10,
    inventory: ["sword", "potion", "artifact"],
    companion: {
        name: "Leo",
        type: "Cat",
        companion: {
            name: "Frank",
            type: "Flea",
            belongings: ["small hat", "sunglasses"]
        }
    },
    roll(mod = 0) {
        const result = Math.floor(Math.random() * 20) + 1 + mod;
        console.log(`${this.name} rolled a ${result}.`);
        return result;
    }
};


//Part 2
class Character {
    static MAX_HEALTH = 100;
    constructor(name) {
        this.name = name;
        this.health = 100;
        this.inventory = [];
    }
    roll(mod = 0) {
        const result = Math.floor(Math.random() * 20) + 1 + mod;
        console.log(`${this.name} rolled a ${result}.`);
        return result;
    }

}

// const robin = new Character("Robin");
// robin.inventory = ["sword", "potion", "artifact"];
// robin.companion = new Character("Leo");
// robin.companion.type = "Cat";
// robin.companion.companion = new Character("Frank");
// robin.companion.companion.type = "Flea";
// robin.companion.companion.inventory = ["small hat", "sunglasses"];

// console.log(robin);


//Part 3
class Adventurer extends Character {
    static ROLES = ["Fighter", "Mage", "Healer", "Wizard"];
    constructor(name, role) {
        super(name);

        if (!Adventurer.ROLES.includes(role)) {
            throw new Error(`Invalid role: ${role}. Valid roles are ${Adventurer.ROLES.join(", ")}.`);
        }
        // Adventurers have specialized roles.
        this.role = role;
        // Every adventurer starts with a bed and 50 gold coins.
        this.inventory.push("bedroll", "50 gold coins");
    }
    // Adventurers have the ability to scout ahead of them.
    scout() {
        console.log(`${this.name} is scouting ahead...`);
        super.roll();
    }
    duel(opponent) {
        console.log(`${this.name} is dueling ${opponent.name}!`);

        // Continue until one adventurer's health drops to 50 or below
        while (this.health > 50 && opponent.health > 50) {
            const myRoll = this.roll(); // Call the roll method on the current character (this)
            const opponentRoll = opponent.roll(); // Call the roll method on the opponent

            if (myRoll > opponentRoll) {
                opponent.health -= 1;
                console.log(`${opponent.name} loses 1 health! Current health: ${opponent.health}`);
            } else if (opponentRoll > myRoll) {
                this.health -= 1;
                console.log(`${this.name} loses 1 health! Current health: ${this.health}`);
            } else {
                opponent.health -= 1;
                this.health -= 1;
                console.log("It's a tie! No health lost this round.");
                console.log(this.health, opponent.health);
            }
            console.log(`Current health: ${this.name} - ${this.health}, ${opponent.name} - ${opponent.health}`);
        }

        // Declare the winner
        if (this.health > 50) {
            console.log(`${this.name} wins the duel!`);
        } else {
            console.log(`${opponent.name} wins the duel!`);
        }
    }
}

class Companion extends Character {
    constructor(name, type) {
        super(name);
        this.type = type;
    }

    follow(adventurer) {
        console.log(`${this.name} is following ${adventurer.name}.`);
    }
}

// // const robin = new Adventurer("Robin", "Scouter");
// robin.companion = new Companion("Leo", "Cat");
// robin.companion.companion = new Companion("Frank", "Flea");
// robin.companion.companion.belongings = ["small hat", "sunglasses"];
// robin.scout();
// robin.companion.follow(robin);

class AdventurerFactory {
    constructor(role) {
        this.role = role;
        this.adventurers = [];
    }
    generate(name) {
        const newAdventurer = new Adventurer(name, this.role);
        this.adventurers.push(newAdventurer);
    }
    findByIndex(index) {
        return this.adventurers[index];
    }
    findByName(name) {
        return this.adventurers.find((a) => a.name === name);
    }
}

const healers = new AdventurerFactory("Healer");

healers.generate("Kate");
healers.generate("Lina");
healers.generate("Siri");
// const robin = healers.generate("Robin");


const wen = new Adventurer("Wen", "Healer");
const max = new Adventurer("Max", "Fighter");

wen.duel(max);