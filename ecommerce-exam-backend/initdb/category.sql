INSERT INTO public.category (id, title, description, category_listing_order)
VALUES 
    (1, 'electronics', 'electronic devices like laptops, phones, ...', 1),
    (2, 'clothing', 'apparel and accessories', 2),
    (3, 'home appliances', 'items for home improvement and kitchenware', 3),
    (4, 'beauty', 'products related to wellness and personal care', 4),
    (5, 'Toys', 'entertainment products for children and adults', 5)
ON CONFLICT (title) DO NOTHING;


SELECT * FROM public.category
ORDER BY id ASC;