const Listing = require("../models/listing");



module.exports.searchResults = async (req, res) => {
    const query = req.query.Type || '';

    // Ensure the user is authenticated
    if (!req.user) {
        req.flash("error", "You must be logged in to view your search results");
        return res.redirect("/login");
    }

    const userId = req.user._id;

    // Search listings for the current user based on the query
    const allListings = await Listing.find({
        owner: userId, // Ensure only listings of the current user are returned
        Type: { $regex: query, $options: 'i' }, // Search by Type (or salary/expense)
    });

    if (allListings.length < 1) {
        req.flash("error", "Expense you searched for is not available");
        return res.redirect("/listings");
    }

    // Render the search results page with filtered listings
    res.render("listings/results.ejs", { allListings });
};


module.exports.index = async (req, res) => {
    // Ensure the user is authenticated
    if (!req.user) {
        req.flash("error", "You must be logged in to view your expenses");
        return res.redirect("/login");
    }

    const userId = req.user._id;

    // Fetch all listings for the logged-in user
    const allListings = await Listing.find({ owner: userId });

    const totasalary = await Listing.aggregate([
        { $match: { owner: userId, Type: "salary" } },
        { $group: { _id: null, total: { $sum: "$price" } } },
    ]);

    const totalexpense = await Listing.aggregate([
        { $match: { owner: userId, Type: "expense" } },
        { $group: { _id: null, total: { $sum: "$price" } } },
    ]);

    // Extract totals or set to 0 if no results
    const totalsalryAmount = totasalary[0]?.total || 0;
    const totalexpenseAmount = totalexpense[0]?.total || 0;

    // Calculate the remaining balance after expenses
    const totalBalance = totalsalryAmount - totalexpenseAmount;

    // Render the index page with the filtered results and totals
    res.render("listings/index.ejs", {
        allListings,
        totalBalance: Math.max(totalBalance, 0), // Ensure balance is not negative
        totalExpenses: totalexpenseAmount,
    });
};



module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("owner");
    if (!listing) {
        req.flash("error", "Expense/salary added for is not available");
        return res.redirect("/listings");
    }
    res.render("listings/show", { listing });
};

module.exports.createListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Expnese you requested for is not available");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing}) 

};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    req.flash("success", "Expense details updated");
    res.redirect(`/listings/${id}`);
};


module.exports.updateListing = async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;

    // Define valid values (all lowercase for easy comparison)
    const validateType = ["salary", "expense"];

    // Convert inputs to lowercase to ensure case-insensitive comparison
    const type = newListing.Type.toLowerCase();

    // Validate `country`
    if (!validateType.includes(type)) {
        req.flash("error", "type should be 'salary' or 'expense'");
        return res.redirect("/listings/new");
    }

    await newListing.save();
    req.flash("success", "New salary/expense is successfully added!");
    res.redirect("/listings");
};


module.exports.distroyListing = async (req, res) => {
    let { id } = req.params;
    let deleredListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Expense/salary deleted!");
    res.redirect("/listings");
};
