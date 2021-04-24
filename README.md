<div style="display: flex; align-items: center;">

<img src="./icon.png" style="border-radius: 50%; margin-right: 1rem;" width="64px" height="64px" alt="InfinitelyTyped icon" />

<h2 style="font-size: 2.5rem; margin-bottom: -0.125rem;">Infinitely Typed</h2>

</div>

---

<br />

## _Types that act like the standard library._

<br />

Infinitely Typed strives to provide useful utility types to enhance your own, for better type checking and intellisense.
It uses a handful of base utility types to construct more meaningful types that mimic the behaviour of the standard library.

---

### **Usage**

Stick this triple-slash directive at the top of your file to use the namespace `InfinitelyTyped`.

```ts
/// <reference types="infinitelytyped" />
```

Alternatively, you can place this in a `global.d.ts` file and have the namespace available globally.

Or you can put it in another type declaration file and include it in your `tsconfig.json`'s `include` property.

---

### **Getting started**

All the types are stored in a single global namespace, which is `InfinitelyTyped`.

This namespace exposes more namespaces that have the actual utility types.

The most important namespace is `InfinitelyTyped.Utils` which contains most of the types.

Next is `InfinitelyTyped.Shared` which holds types that could be shared by many types.

Then you have the following namespaces:

-   `InfinitelyTyped.Strings`
-   `InfinitelyTyped.Arrays`

If anything gets confusing, please read the [documentation](https://infinitelytyped.github.io) or join the [Discord server](https://discord.gg/XCYSpnKhyq).

---

### **Documentation**

The documentation can be found [here](https://infinitelytyped.github.io) and covers all the utility types.

If anything is outdated or outright incorrect please either open an issue or submit a pull request to get it fixed!

---

<br />

##### _Provided by the [ŤŷpęȘčrīpț Čūļt](https://github.com/TypeScript-Cult)_, licensed under [MIT](LICENSE).
