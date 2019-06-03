export default function(primal){
    switch(primal.type){
        case "Max":
            fromMax(primal)
        case "Min":
            fromMin(primal)
    }    


}

function fromMin(primal){
    variables = primal.variables
    restricitons = primal.restricitons
    varRestrictions = primal.varRestrictions
}

function fromMax(primal){
    variables = primal.variables
    restricitons = primal.restricitons
    varRestrictions = primal.varRestrictions
}