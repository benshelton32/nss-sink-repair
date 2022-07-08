import { getRequests, deleteRequest, getPlumbers, saveCompletions } from "./dataAccess.js"

export const Requests = () => {
    const requests = getRequests()
    const plumbers = getPlumbers()

    let html = `
        <ul>
            ${
                requests.map(request => {
                    return `
                    <li>
                        ${request.description}
                        <select class="plumbers" id="plumbers">
                            <option value="">Choose</option>
                            ${
                                plumbers.map(
                                    plumber => {
                                        return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
                                    }
                                ).join("")
                            }
                        </select>
                        <button class="request__delete" id="request--${request.id}">
                            Delete
                        </button>
                    </li>`
                }).join("")
            }
        </ul>
    `

    return html
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            const timestamp = Date.now()

            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = { 
                requestId: parseInt(requestId),
                plumberId: parseInt(plumberId),
                date_created: timestamp
            }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
            saveCompletions(completion)
        }
    }
)
