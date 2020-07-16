export default class ArrayUtils {
    public static removeElement<T>(array: T[], element: T): T[] {
        const index = array.indexOf(element);

        if(index >= 0) {
            return array.splice(index, 1);
        }

        return array;
    }

    public static lastElement<T>(array: T[]):T {
        if(array.length <= 0){
            return null;
        }

        return array[array.length - 1];
    }

    public static randomElement<T>(array: T[]):T {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }
}