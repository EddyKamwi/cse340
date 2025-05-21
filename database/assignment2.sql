INSERT INTO public.account (account_firstname, account_lastname, account_email, account_password)
VALUES
('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

UPDATE public.account
SET account_type = 'Admin'
WHERE account_id = 1;

DELETE FROM public.account
WHERE account_id = 1;

UPDATE public.inventory
SET inv_description = REPLACE(inv_description,'small interiors','a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

SELECT inv_make, inv_model, classification_name
FROM public.inventory
JOIN public.classification ON public.inventory.classification_id = public.classification.classification_id
Where public.classification.classification_name = 'Sport';

UPDATE public.inventory
SET (inv_image, inv_thumbnail) = (
    REPLACE(inv_image,'images/','images/vehicles/'),
    REPLACE(inv_thumbnail,'images','images/vehicles'));
