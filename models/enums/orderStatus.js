const orderStatusEnum = {
    PROCESSED: 'PROCESSED',
    NEW: 'NEW',
};

exports.enum = orderStatusEnum;
exports.enumArray = Object.keys(orderStatusEnum).map((key) => orderStatusEnum[key]);
