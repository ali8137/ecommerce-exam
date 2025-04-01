-- Electronics
INSERT INTO public.product (title, description, price, product_listing_order, category_id)
VALUES 
    ('Laptop', 'High-performance laptop for work and gaming', 1200.99, 1, 1),
    ('Smartphone', 'Latest model smartphone with advanced camera', 899.99, 2, 1),
    ('Wireless Earbuds', 'Noise-canceling Bluetooth earbuds', 129.99, 3, 1),
    ('Smartwatch', 'Fitness tracking and notifications on your wrist', 199.99, 4, 1),
    ('Gaming Console', 'Next-gen gaming console with immersive experience', 499.99, 5, 1);

-- Clothing
INSERT INTO public.product (title, description, price, product_listing_order, category_id)
VALUES 
    ('T-Shirt', 'Cotton t-shirt available in multiple colors', 19.99, 1, 2),
    ('Jeans', 'Slim-fit denim jeans for casual wear', 39.99, 2, 2),
    ('Sneakers', 'Comfortable and stylish sneakers', 59.99, 3, 2),
    ('Jacket', 'Warm and stylish winter jacket', 79.99, 4, 2),
    ('Sunglasses', 'UV-protection sunglasses for outdoor use', 24.99, 5, 2);

-- Home Appliances
INSERT INTO public.product (title, description, price, product_listing_order, category_id)
VALUES 
    ('Air Fryer', 'Oil-free cooking for healthy meals', 99.99, 1, 3),
    ('Vacuum Cleaner', 'Powerful vacuum for deep cleaning', 149.99, 2, 3),
    ('Coffee Maker', 'Automatic coffee maker with multiple brew options', 89.99, 3, 3),
    ('Microwave Oven', 'High-power microwave for fast cooking', 129.99, 4, 3),
    ('Blender', 'Multi-purpose blender for smoothies and shakes', 69.99, 5, 3);

-- Beauty
INSERT INTO public.product (title, description, price, product_listing_order, category_id)
VALUES 
    ('Face Cream', 'Moisturizing face cream for glowing skin', 29.99, 1, 4),
    ('Shampoo', 'Anti-dandruff shampoo with natural ingredients', 14.99, 2, 4),
    ('Perfume', 'Long-lasting fragrance for men and women', 49.99, 3, 4),
    ('Lipstick', 'Matte finish lipstick available in various shades', 9.99, 4, 4),
    ('Body Lotion', 'Hydrating body lotion for soft skin', 19.99, 5, 4);

-- Toys
INSERT INTO public.product (title, description, price, product_listing_order, category_id)
VALUES 
    ('Building Blocks', 'Educational building blocks for kids', 29.99, 1, 5),
    ('RC Car', 'Remote control car for indoor and outdoor fun', 39.99, 2, 5),
    ('Dollhouse', 'Miniature dollhouse with furniture set', 49.99, 3, 5),
    ('Puzzle Set', 'Brain-teasing puzzle game for all ages', 19.99, 4, 5),
    ('Action Figure', 'Collectible action figure from popular series', 24.99, 5, 5);
