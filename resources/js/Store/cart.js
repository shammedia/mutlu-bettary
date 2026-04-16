import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {

    const carts = ref(JSON.parse(localStorage.getItem('carts') || '[]'))

    const count = computed(() => {
        return carts.value.reduce((total, item) => total +1, 0)
    })
const emptyCart = () => {
    carts.value = [];
    localStorage.setItem('carts', JSON.stringify(carts.value));
};
    const addToCart = (sp) => {





        const index = carts.value.findIndex(item => item.id === sp.id);


        if (index !== -1) {
            carts.value[index].quantity += 1;
        }
        // 4️⃣ إذا غير موجود → حفظ كامل البيانات
        else {
            carts.value.push({
                ...sp,
                quantity: 1
            });
        }

        localStorage.setItem('carts', JSON.stringify(carts.value));

    };
    const removeFromCart = (cart) => {

        carts.value = carts.value.filter(item =>
            !(item.id === cart.id && item.product_id === cart.product_id)
        );

        localStorage.setItem('carts', JSON.stringify(carts.value));
    };
    const addQuantity = (cart) => {

        const index = carts.value.findIndex(item =>
            item.id === cart.id &&
            item.product_id === cart.product_id
        );

        if (index !== -1) {
            carts.value[index].quantity += 1;
        }

        localStorage.setItem('carts', JSON.stringify(carts.value));

    };



    const decreaseQuantity = (cart) => {

        const item = carts.value.find(item =>
            item.id === cart.id &&
            item.product_id === cart.product_id
        );

        if (!item) return;

        if (item.quantity > 1) {
            item.quantity--;
        } else {
            carts.value = carts.value.filter(item =>
                !(item.id === cart.id && item.product_id === cart.product_id)
            );
        }

        localStorage.setItem('carts', JSON.stringify(carts.value));
    };
    return { carts, count,addToCart,removeFromCart,addQuantity,decreaseQuantity,emptyCart }
})
