CREATE TABLE users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    address TEXT,
    mobile_no TEXT,
    password TEXT NOT NULL
);

CREATE TABLE sellers(
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    mobile_no TEXT NOT NULL,
    fund_type TEXT NOT NULL CHECK (fund_type IN ('vpa','bank_account')),
    fund_id TEXT NOT NULL,
    contact_id TEXT NOT NULL,
    wallet NUMERIC(10,2) DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT, 
    price NUMERIC(10, 2) CHECK (price >= 0),
    seller_id TEXT NOT NULL,
    img_url TEXT,
    category TEXT NOT NULL CHECK (category IN ('Clothing','Footwear','Accessories','Cosmetics')),
    tags TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES sellers(id) ON DELETE CASCADE
);


CREATE TABLE cart (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
	  count INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE(user_id, product_id) 
);

CREATE TABLE orders(

    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    total_cost NUMERIC(10,2) NOT NULL,
    items JSON,
    paymentDone BOOLEAN DEFAULT FALSE,
    delivered   BOOLEAN DEFAULT FALSE,
    delivered_at TIMESTAMP,
    payment_id TEXT,
    receipt_id TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

)
