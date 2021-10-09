class PageJsClass {
    CarNoList: CarNoList;

    constructor() {
        this.CarNoList = new CarNoList("selected-carno");
    }
};

class CarNoList {
    ShowTagName: string;
    CarNoList: string[] = [];

    constructor(listHtmlId: string) {
        this.ShowTagName = listHtmlId;
    }

    public ShowCarNoList() {
        let showUlTag = document.getElementById(this.ShowTagName) as HTMLUListElement;
        showUlTag.innerHTML = "";  // 一種ul tag清空方法

        this.CarNoList.forEach(value => {
            const inputTag = document.createElement("input") as HTMLInputElement;
            inputTag.name = "PostCarNo";
            inputTag.value = value;
            inputTag.type = "hidden";
            const iDelTag = document.createElement("i");
            iDelTag.classList.add("fas", "fa-times-circle");
            iDelTag.style.cursor = "pointer";
            iDelTag.style.color = "red";
            iDelTag.addEventListener('click', () => {
                this.RemvoeCarNoProcess(value);
            });
            const liTag = document.createElement("li") as HTMLLIElement;
            liTag.textContent = `${value} \u00A0\u00A0`;
            liTag.appendChild(inputTag);
            liTag.appendChild(iDelTag);
            showUlTag.appendChild(liTag);
        })

        // 狀態顯示
        this.ShowCarNoMessage(this.CarNoList.length === 0 ? "無相關車牌" : `已加入${this.CarNoList.length} 項`);
    }

    private RemvoeCarNoProcess(carNo: string) {
        this.RemvoeCarNo(carNo);
        this.ShowCarNoList();
    }


    private RemvoeCarNo(carNo: string) {
        this.CarNoList.splice(this.CarNoList.indexOf(carNo), 1)
    }

    public AppendToList(carNo: string) {
        if (!this.CarNoList.includes(carNo)) {
            this.CarNoList.push(carNo);
        }
    }
    public ShowCarNoMessage(msg: string) {
        document.getElementById("carno-message").innerHTML = msg
    }

}

