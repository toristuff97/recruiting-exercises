// Create a function to allocate inventory with items map and warehouse object as parameters
allocateInventory = (x, y) => {

    // Checking if each fruit is requested and assigning each value to a requested variable
    x.apple ? (requestedApples = x.apple) : (requestedApples = 0);
    x.orange ? (requestedOranges = x.orange) : (requestedOranges = 0);
    x.banana ? (requestedBananas = x.banana) : (requestedBananas = 0);

    // Saving total requested fruits to totalReq variable
    let totalReq = requestedApples + requestedBananas + requestedOranges;

    // Testing if the values are correct
    // console.log("reqApples: " + requestedApples);
    // console.log("reqBananas: " + requestedBananas);
    // console.log("reqOranges: " + requestedOranges);
    // console.log("total requested: " + totalReq);

    // Initializing variables for original fruit stock at warehouse one (stockApplesOne), to count how many are left to give (oneApples), as well as a counter for how many fruits have been put towards the order request (soldApplesOne).
    y[0].inventory.apple ? (oneApples = y[0].inventory.apple) : (oneApples = 0);
    y[0].inventory.banana
        ? (oneBananas = y[0].inventory.banana)
        : (oneBananas = 0);
    y[0].inventory.orange
        ? (oneOranges = y[0].inventory.orange)
        : (oneOranges = 0);
    let stockApplesOne = oneApples;
    let stockBananasOne = oneBananas;
    let stockOrangesOne = oneOranges;
    let soldApplesOne = 0;
    let soldBananasOne = 0;
    let soldOrangesOne = 0;

    // Same as above but with warehouse two, and only delcaring instead of initializing, in case only warehouse one is included in the input
    let twoApples = 0;
    let twoBananas = 0;
    let twoOranges = 0;
    let stockApplesTwo = 0;
    let stockBananasTwo = 0;
    let stockOrangesTwo = 0;
    let soldApplesTwo = 0;
    let soldBananasTwo = 0;
    let soldOrangesTwo = 0;

    // Only inititializing stock variables for second warehouse if it is part of the initial input (warehouse array being longer than one in length)
    if (y.length > 1) {
        y[1].inventory.apple ? (twoApples = y[1].inventory.apple) : (twoApples = 0);
        y[1].inventory.banana
        ? (twoBananas = y[1].inventory.banana)
        : (twoBananas = 0);
        y[1].inventory.orange
        ? (twoOranges = y[1].inventory.orange)
        : (twoOranges = 0);
        stockApplesTwo = twoApples;
        stockBananasTwo = twoBananas;
        stockOrangesTwo = twoOranges;
        houseTwo = y[1].name.toString();
    }

    //Loops to reduce stock in each warehouse depending on how many of each fruit was requested, as well as if there is enough inventory in each warehouse (seemed like the most thorough way to make sure stock in one warehouse is completely exhausted before moving on to the second)
    while (oneApples > 0 && requestedApples > 0) {
        oneApples--;
        requestedApples--;
        totalReq--;
        soldApplesOne++;
    }

    while (oneBananas > 0 && requestedBananas > 0) {
        oneBananas--;
        requestedBananas--;
        totalReq--;
        soldBananasOne++;
    }

    while (oneOranges > 0 && requestedOranges > 0) {
        oneOranges--;
        requestedOranges--;
        totalReq--;
        soldOrangesOne++;
    }

    while (requestedApples > 0 && twoApples > 0) {
        twoApples--;
        requestedApples--;
        totalReq--;
        soldApplesTwo++;
    }

    while (requestedBananas > 0 && twoBananas > 0) {
        twoBananas--;
        requestedBananas--;
        totalReq--;
        soldBananasTwo++;
    }

    while (requestedOranges > 0 && twoOranges > 0) {
        twoOranges--;
        requestedOranges--;
        totalReq--;
        soldOrangesTwo++;
    }

    // These are objects to hold the requests fulfilled in each warehouse
    let oneFruits = {
        owd: {},
    };

    let twoFruits = {
        dm: {},
    };

    // Creating the output with warehouse objects and how many fruits each gave, if any
    let output = [];
    // If the requested amount was fulfilled, the total amount fulfilled by each warehouse is added to the empty objects above and pushed into the output array.
    if (totalReq == 0) {
        // If the initial input included a request for at least one apple, and warehouse one had at least one apple in stock, the sold amount is added to the oneFruits object, and so on.
        x.apple > 0
        ? stockApplesOne > 0
            ? (oneFruits.owd.apple = soldApplesOne)
            : oneFruits
        : (oneFruits = oneFruits);
        x.banana > 0
        ? stockBananasOne > 0
            ? (oneFruits.owd.banana = soldBananasOne)
            : (oneFruits = oneFruits)
        : (oneFruits = oneFruits);
        x.orange > 0
        ? stockOrangesOne > 0
            ? (oneFruits.owd.orange = soldOrangesOne)
            : (oneFruits = oneFruits)
        : (oneFruits = oneFruits);
        x.apple > 0
        ? stockApplesTwo > 0 && soldApplesTwo > 0
            ? (twoFruits.dm.apple = soldApplesTwo)
            : (twoFruits = twoFruits)
        : (twoFruits = twoFruits);
        x.banana > 0
        ? stockBananasTwo > 0 && soldBananasTwo > 0
            ? (twoFruits.dm.banana = soldBananasTwo)
            : (twoFruits = twoFruits)
        : (twoFruits = twoFruits);
        x.orange > 0
        ? stockOrangesTwo > 0 && soldOrangesTwo > 0
            ? (twoFruits.dm.orange = soldOrangesTwo)
            : (twoFruits = twoFruits)
        : (twoFruits = twoFruits);
        output.push(oneFruits);
        // If there is no stock at all in the second warehouse, the twoFruits object is excluded from the output array.
        twoFruits.dm.apple || twoFruits.dm.banana || twoFruits.dm.orange
        ? output.push(twoFruits)
        : undefined;
        console.log(output);

        //If the total order was not fulfilled, the empty output array is returned.
    } else {
        console.log(output);
    }
};

// Unit tests
allocateInventory({ apple: 1 }, [{ name: "owd", inventory: { apple: 1 } }]);

allocateInventory({ apple: 1 }, [{ name: "owd", inventory: { apple: 0 } }]);

allocateInventory({ apple: 10 }, [
  { name: "owd", inventory: { apple: 5 } },
  { name: "dm", inventory: { apple: 5 } },
]);

allocateInventory({ banana: 4, orange: 1 }, [
  { name: "owd", inventory: { orange: 1 } },
]);

allocateInventory({ orange: 3, apple: 5, banana: 2 }, [
  { name: "owd", inventory: { apple: 2, orange: 1 } },
  { name: "dm", inventory: { banana: 2, apple: 3, orange: 2 } },
]);
