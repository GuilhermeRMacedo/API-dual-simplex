 module.exports = function toDual(primal){
    
    switch(primal.type){
        case types.MAX:
            return fromMax(primal)
        case types.MIN:
            return fromMin(primal)
    }    
}

const types = {
    MAX : 'Max',
    MIN : 'Min'
}

const equality = {
    LESS : "<=",
    EQUAL : "=",
    PLUS : ">=",
    FREE : "" 
}

function fromMin(primal){
    let dualVariables = Array()  
    let dualRestrictions = Array()
    let dualVarRestrictions = Array()
    
    

    primal.restrictions.forEach(element => {
        dualVariables.push({
            id: element.id,
            val: element.val
        })
                
        let dualVarRestrictionEquality

            switch (element.equality) {
                case equality.PLUS:
                    dualVarRestrictionEquality = equality.LESS
                    break
                case equality.EQUAL:
                    dualVarRestrictionEquality = equality.FREE
                    break
                case equality.LESS:
                    dualVarRestrictionEquality = equality.PLUS
                    break
                case equality.FREE:
                    dualVarRestrictionEquality = equality.EQUAL
                    break
                default:

                    break
            }

        dualVarRestrictions.push({
            id: element.id,
            equality: dualVarRestrictionEquality
        })
                
    })
    primal.variables.forEach(element => {
        
    });


    return {
        type: types.MAX

    }
}

function fromMax(primal){
    let dualVariables = Array()  
    let dualRestrictions = Array()
    let dualVarRestrictions = Array()
    
    
    primal.restrictions.forEach(element => {
        dualVariables.push({
            id: element.id,
            val: element.val
        })
                
        let dualVarRestrictionEquality

            switch (element.equality) {
                case equality.PLUS:
                    dualVarRestrictionEquality = equality.LESS
                    break
                case equality.EQUAL:
                    dualVarRestrictionEquality = equality.FREE
                    break
                case equality.LESS:
                    dualVarRestrictionEquality = equality.PLUS
                    break
                case equality.FREE:
                    dualVarRestrictionEquality = equality.EQUAL
                    break
                default:

                    break
            }

        dualVarRestrictions.push({
            id: element.id,
            equality: dualVarRestrictionEquality
        })
      
    })

    primal.variables.forEach(element => {
        let varPresence = Array()

        primal.restrictions.forEach(restriction => {
        
            restriction.restriction_var.forEach(variable => {
 
                if(variable.var_id == element.id){
                    varPresence.push({
                        var_id: restriction.id,
                        val: variable.val
                    })
                }
            })
        })

        var restrictionEquality 
        primal.varRestrictions.forEach(varRestriction =>{
          
            if(varRestriction.var_id == element.id){
                
                restrictionEquality = varRestriction.equality
            }
        })
        
        dualRestrictions.push({
            id: element.id,
            restriction_var: varPresence,
            equality: restrictionEquality,
            val: element.val
        })

    })
  
    
    return {
        type: types.MIN,
        variables: dualVariables,
        restrictions: dualRestrictions,
        varRestrictions: dualVarRestrictions

    }

    
}