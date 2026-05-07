import Category from '../models/Category.ts';
import MenuItem from '../models/MenuItem.ts';

const categories = [
  { name: 'Starter', icon: 'Soup' },
  { name: 'Main', icon: 'Utensils' },
  { name: 'Dessert', icon: 'Cake' },
  { name: 'Wine', icon: 'Wine' },
];

export const seedDatabase = async () => {
  try {
    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0) {
      console.log('Seeding categories...');
      const createdCategories = await Category.insertMany(categories);
      
      // Optionally seed some menu items
      const mainCat = createdCategories.find(c => c.name === 'Main');
      if (mainCat) {
          await MenuItem.create({
            name: 'Signature Wagyu',
            description: 'A5 Grade Wagyu beef with truffle butter.',
            price: 95,
            image: 'https://images.unsplash.com/photo-1546241072-48010ad28c2c?w=600&q=80',
            category: mainCat._id,
            isPopular: true,
            chefNotes: 'The pinnacle of marbleized perfection.'
          });
      }
      console.log('Seeding complete.');
    }
  } catch (err) {
    console.error('Seeding error:', err);
  }
};
